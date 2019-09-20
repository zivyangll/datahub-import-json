# datahub-import-json

[![NPM version][npm-image]][npm-url]
[![Build status][travis-image]][travis-url]
[![Coverage status][codecov-image]][codecov-url]
[![Dependency status][daviddm-image]][daviddm-url]

> Upload all files below the mock file to DataHub

## Installment

```bash
$ npm i datahub-import-json -g
```

## Usage

```bash
$ datahub-import-json test-project -d /Users/xxx/mock/get --method GET
$ datahub-import-json test-project -d /Users/xxx/mock/post --method POST
```

## Configuration

```bash
$  datahub-import-json projectName
```

| param | description | default |
| -- | -- | -- |
| -s | DataHub server address | http://127.0.0.1:5678 |
| -d | mock data directory path | - |
| --mockSuffix | set mock file suffix | .json |
| --interfaceSuffix | DataHub interface suffix | .json |
| --mockRemoveSuffix | replace mockRemoveSuffix to interfaceSuffix | - |
| --method | DataHub interface method | ALL |

## Examples

### Import JSON interface

假设项目名为：test-project（建议与仓库名称保持一致）
mock 数据文件件路径为：/Users/xxx/mock
DataHub server 地址为：http://127.0.0.1:5678/
想导入的 Mock 文件后缀为：.json
导入后的 Mock 接口后缀为：.html

```bash
$ datahub-import-json test-project -d /Users/xxx/mock --interfaceSuffix .html -s http://127.0.0.1:5678
```

### Import js interface

假设项目名为：test-project（建议与仓库名称保持一致）
mock 数据文件件路径为：/Users/xxx/mock
DataHub server 地址为：http://127.0.0.1:5678/
想导入的 Mock 文件路径为：
/Users/xxx/mock/post/member/xxx.html/data.json
/Users/xxx/mock/post/member/xxx.html/data.js
导入后的 Mock 接口路径为：/member/xxx.html

```bash
# post 请求
$ datahub-import-json test-project -d /Users/xxx/mock/post/ --interfaceSuffix .html --mockRemoveSuffix /data.json --method POST -s http://127.0.0.1:5678

# get 请求
$ datahub-import-json test-project -d /Users/xxx/mock/get/ --interfaceSuffix .html --mockRemoveSuffix /data.json --method GET -s http://127.0.0.1:5678
```

---

## License

[MIT](http://opensource.org/licenses/MIT)

[npm-image]: https://img.shields.io/npm/v/datahub-import-json.svg?style=flat-square&logo=npm
[npm-url]: https://npmjs.org/package/datahub-import-json
[travis-image]: https://img.shields.io/travis/zivyangll/datahub-import-json/master.svg?style=flat-square&logo=travis
[travis-url]: https://travis-ci.org/zivyangll/datahub-import-json
[codecov-image]: https://img.shields.io/codecov/c/github/zivyangll/datahub-import-json/master.svg?style=flat-square&logo=javascript
[codecov-url]: https://codecov.io/gh/zivyangll/datahub-import-json
[daviddm-image]: https://img.shields.io/david/zivyangll/datahub-import-json.svg?style=flat-square
[daviddm-url]: https://david-dm.org/zivyangll/datahub-import-json
