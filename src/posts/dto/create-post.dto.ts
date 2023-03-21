import { Injectable } from "@nestjs/common";

@Injectable()
export class CreatePostDto {
  oid?: string;
  adminOid?: string;
  cityOid?: string;
  categoryOid: string;
  title: string;
  address: string;
  token?: string;
  phoneNumber: string;
  contents: string;
  views?: number;

  createDate?: Date;
  updateDate?: Date;
}
