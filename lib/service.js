const fs = require('fs');
const fetch = require('node-fetch');

// 查询项目
async function queryProject(options) {
  return await fetch(`${options.server}/api/project`).then(res => res.json());
}

// 添加项目
async function addProject(options) {
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
  let pathname = filepath.replace(options.mockDir + '/', '');

  // 只进行删除，不替换后缀
  if (options.mockRemoveSuffix) {
    pathname = pathname.replace(new RegExp(options.mockRemoveSuffix + '$'), '');
  } else {
    // 进行替换
    pathname = pathname.replace(
      new RegExp(options.mockSuffix + '$'),
      options.interfaceSuffix
    );
  }

  const interfaceData = await fetch(`${options.server}/api/interface`, {
    method: 'POST',
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      description: '.',
      method: options.method,
      pathname,
      projectUniqId,
    }),
  })
    .then(res => res.json())
    .catch(() => {});

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

module.exports = {
  queryProject,
  addProject,
  addInterface,
};
