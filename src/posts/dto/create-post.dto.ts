import { Injectable } from "@nestjs/common";

@Injectable()
export class CreatePostDto {
  oid?: string;
  // 어드민 아이디 값
  title: string;
  // 어드민 패스워드
  address: string;
  phoneNumber: string;
  contents: string;
  views: number;
}
