const express = require("express");
const router = express.Router();
const axios = require("axios");

const PlatformSuffixMap = {
  darwin: ".app.tar.gz",
  linux: ".AppImage.tar.gz",
  win64: ".msi.zip",
};

router.route("/:platform/:version").get(async function (req, res) {
  const { platform, version } = req.params;
  const suffix = PlatformSuffixMap[platform ?? ""];
  if (suffix) {
    const releases = await axios.get(
      "https://api.github.com/repos/Manonicu/musik/releases"
    );
    // 过滤状态得到最后一个正式的版本号
    const latestRelease = releases.data.find(
      (item) => !item.draft && !item.prerelease
    );
    if (latestRelease) {
      // 分别查找安装包和签名文件
      const binaryAsset = latestRelease.assets.find((e) =>
        e.name.endsWith(suffix)
      );
      const sigAsset = latestRelease.assets.find((e) =>
        e.name.endsWith(`${suffix}.sig`)
      );
      if (binaryAsset && sigAsset) {
        const sigContent = await axios.get(sigAsset.browser_download_url);

        // 返回版本更新信息
        res.status(200).json({
          url: binaryAsset.browser_download_url,
          version: latestRelease.tag_name,
          notes: latestRelease.body,
          pub_date: latestRelease.published_at,
          signature: sigContent.data,
        });
        return;
      }
    }
  }
  res.status(204).end();
});

module.exports = router;
