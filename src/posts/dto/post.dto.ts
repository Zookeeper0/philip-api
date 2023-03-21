// api문서 자동화 도구 사용해보기
// import { ApiProperty } from "@nestjs/swagger";

export class PostDto {
  id: string;

  title: string;

  contents: string;

  views: number;

  createDate: Date;

  updateDate: Date;
}
