const fs = require('fs');
const path = require('path');
const fetch = require('node-fetch');

module.exports = function(options) {
  // 创建 DataHub 项目，并批量添加接口和默认场景数据
  addProject(options).then(res => {
    if (!res.success || !res.data) return;

    // 获取目录下所有 mock 文件地址
    const mockPath = getMockFilePath(options);
    mockPath.forEach(async filepath => {
      await addInterface(filepath, res.data.uniqId, options);
    });
  });
};

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

// 添加项目
async function addProject(options) {
  console.log(`${options.server}/api/project`);
  return await fetch(`${options.server}/api/project`, {
    method: 'POST',
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      description: options.projectName,
      globalProxy: '',
      projectName: options.projectName,
    }),
  }).then(res => res.json());
}

// 添加 DataHub 接口
async function addInterface(filepath, projectUniqId, options) {
  const pathname = options.interfaceSuffix
    ? filepath.replace(
        new RegExp(options.mockSuffix + '$'),
        options.interfaceSuffix
      )
    : filepath;
  const interfaceData = await fetch(`${options.server}/api/interface`, {
    method: 'POST',
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      description: '.',
      method: 'ALL',
      pathname: pathname.replace(options.mockDir + '/', ''),
      projectUniqId,
    }),
  }).then(res => res.json());

  if (interfaceData.success) {
    const interfaceUniqId = interfaceData.data.uniqId;
    const fileData = fs.readFileSync(filepath).toString();

    if (!fileData.length) return;

    try {
      /* eslint no-eval: 0 */
      eval('var mockData = ' + fileData);
      /* global mockData */
      await addDefaultScene(interfaceUniqId, mockData, options);
    } catch (e) {
      console.log('=====file error=====: ', filepath);
      console.log('=====parse error====: ', e);
    }
  }
}

// 添加默认场景数据
async function addDefaultScene(interfaceUniqId, data, options) {
  await fetch(`${options.server}/api/scene`, {
    method: 'POST',
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      contextConfig: {
        responseDelay: 0,
        responseHeaders: {},
        responseStatus: 200,
      },
      sceneName: 'default',
      data,
      interfaceUniqId,
    }),
  }).then(res => res.json());
}
