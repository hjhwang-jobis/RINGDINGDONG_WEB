# 삼쩜삼 링딩동 프로젝트(CRM 자동발송)

## Run local web server

```
$ cd services/szs-rdd
$ yarn start
```

## Build web application(dev)

```
$ cd services/szs-rdd
$ yarn build:dev
```

## Trouble shooting

### import한 패키지 모듈을 인식할 수 없다고 나옵니다

이 문제는 yarn workspace 안에서 타입스크립트 버전을 지정할 수 없어서 발생하는 이슈입니다. 아래 명령어를 root 디렉토리에서 실행하면 해결할 수 있습니다. [관련 정보: Yarn Editor SDK](https://yarnpkg.com/getting-started/editor-sdks)

```
$ yarn dlx @yarnpkg/sdks vscode
$ yarn install
```
