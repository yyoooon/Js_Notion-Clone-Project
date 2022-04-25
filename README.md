# 노션 클로닝 프로젝트
<img src="https://img.shields.io/badge/JavaScript-F7DF1E?style=for-the-badge&logo=JavaScript&logoColor=ffffff"/> <img src="https://img.shields.io/badge/ESLint-4B32C3?style=for-the-badge&logo=ESLint&logoColor=ffffff"/> <img src="https://img.shields.io/badge/Prettier-F7B93E?style=for-the-badge&logo=Prettier&logoColor=ffffff"/>                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                       
### Vanilla js만을 사용해 컴포넌트 기반의 SPA를 구현해보는 프로젝트

**기간**
</br>
21.08.25 ~ 21.09.10
리팩토링 22.04.11~

**인원**
</br>
개인 프로젝트

[배포 링크](https://js-notion-clone-project.vercel.app/)

#### 주요 기능

- **컴포넌트 패턴** 기반의 개발.
- CRUD API를 이용해 **문서 생성/조회/수정/삭제** 기능과 
**문서 목록 조회** 기능 구현.
- 문서 생성 시 특정 문서의 하위로 종속시킬 수 있어 문서 목록이 
**트리 구조**로 구성됨.
- **debounce**를 적용해 텍스트가 입력되는 동안 특정 시간 마다 **자동 저장**되도록 구현.
- History API를 이용해 **SPA의 형태**로 구현.

</br>

  *트리구조의 문서 목록*
  
  <img width='20%' src='https://user-images.githubusercontent.com/81611808/147889117-2dd6894d-c589-4109-9a11-d757f5d0c8f0.png'>

</br>


## 컴포넌트 구조
![컴포넌트 구조](https://user-images.githubusercontent.com/81611808/147889079-d5e72ae4-814e-4ecd-a30b-2430c6bf2b5e.png)

