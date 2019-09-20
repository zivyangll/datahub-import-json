const { getMockFilePath } = require('./utils');

const { addProject, queryProject, addInterface } = require('./service');

module.exports = async function(options) {
  // 参数处理
  options.mockDir = options.mockDir.replace(/\/$/, '');

  // 查询项目是否已经添加过
  const res = await queryProject(options);

  // 获取目录下所有 mock 文件地址
  const mockPath = getMockFilePath(options);

  if (res && res.data) {
    const findProject = res.data.filter(
      i => i.projectName === options.projectName
    )[0];
    if (findProject && findProject.uniqId) {
      mockPath.forEach(async path => {
        await addInterface(path, findProject.uniqId, options);
      });
      return;
    }
  }

  // 创建 DataHub 项目，并批量添加接口和默认场景数据
  const addRes = await addProject(options);
  if (!addRes.success || !addRes.data) return;

  mockPath.forEach(async filepath => {
    await addInterface(filepath, addRes.data.uniqId, options);
  });
};
