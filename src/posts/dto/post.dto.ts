// api문서 자동화 도구 사용해보기
// import { ApiProperty } from "@nestjs/swagger";

export class PostDto {
  id: string;

  storeName: string;

  contents: string;

  views: number;

  createDate: Date;

  updateDate: Date;
}
