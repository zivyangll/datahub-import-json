const fs = require('fs');
const path = require('path');

function getMockFilePath(options) {
  const mockDir = path.join(options.mockDir);
  const mockSuffix = options.mockSuffix;
  const mockPath = [];

  // 获取所有 JSON 文件
  readDirSync(mockDir, mockPath, mockSuffix);

  // 处理同级目录下的同名 JS 文件，将拿到的数据覆盖对应 JSON 文件
  handleJsonToJsSycn(mockPath, mockSuffix);

  return mockPath;
}

// 获取目录下所有 mock 文件地址
function readDirSync(dir, mockPath, mockSuffix) {
  const pa = fs.readdirSync(dir);
  pa.forEach(itemPath => {
    const childrenPath = path.join(dir, itemPath);
    const info = fs.statSync(childrenPath);
    if (info.isDirectory()) {
      readDirSync(childrenPath, mockPath, mockSuffix);
    } else {
      if (new RegExp(mockSuffix + '$').test(itemPath)) {
        mockPath.push(childrenPath);
      }
    }
  });
}

function handleJsonToJsSycn(mockPath, mockSuffix) {
  mockPath.forEach(itemPath => {
    const jsFilePath = itemPath.replace(new RegExp(mockSuffix + '$'), '.js');
    if (fs.existsSync(jsFilePath)) {
      try {
        const js = require(jsFilePath);
        const json = require(itemPath);
        if (typeof js === 'function' && json) {
          fs.writeFileSync(itemPath, JSON.stringify(js(json)));
        } else if (typeof js === 'object') {
          fs.writeFileSync(itemPath, JSON.stringify(js));
        }
      } catch (e) {
        console.log(e);
      }
    }
  });
}

module.exports = {
  getMockFilePath,
};
