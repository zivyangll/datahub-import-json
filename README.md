# datahub-import-json

[![NPM version][npm-image]][npm-url]
[![Build status][travis-image]][travis-url]
[![Coverage status][codecov-image]][codecov-url]
[![Dependency status][daviddm-image]][daviddm-url]

> Upload all files below the mock file to DataHub

## Installment

```bash
$ npm i datahub-import-json -gq
```

## Usage

```bash
$ datahub-import-json test-project -d /Users/xxx/mock -s http://127.0.0.1:5678
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
