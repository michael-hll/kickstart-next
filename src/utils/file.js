function getRootDir(filePath) {
  let index = filePath.lastIndexOf("/src");
  if (index === -1) {
    return filePath;
  }
  return filePath.substring(0, index);
}

module.exports = {
  getRootDir,
}