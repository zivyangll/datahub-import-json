const fs = require('fs');
const path = require('path');

function getMockFilePath(options) {
  const mockDir = path.join(options.mockDir);
  const mockSuffix = options.mockSuffix;
  const mockPath = [];
  readDirSync(mockDir, mockPath, mockSuffix);
  return mockPath;
}

// 获取目录下所有 mock 文件地址
function readDirSync(dir, mockPath, mockSuffix) {
  const pa = fs.readdirSync(dir);
  pa.forEach(ele => {
    const childrenPath = path.join(dir, ele);
    const info = fs.statSync(childrenPath);
    if (info.isDirectory()) {
      readDirSync(childrenPath, mockPath, mockSuffix);
    } else {
      if (new RegExp(mockSuffix + '$').test(ele)) {
        mockPath.push(childrenPath);
      }
    }
  });
}

module.exports = {
  getMockFilePath,
};
