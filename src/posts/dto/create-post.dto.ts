import { Injectable } from "@nestjs/common";

@Injectable()
export class CreatePostDto {
  oid?: string;
  adminOid?: string;

  categoryOid: string;
  title: string;
  address: string;

  phoneNumber: string;
  contents: string;
  views: number;

  createDate?: Date;
  updateDate?: Date;
}
