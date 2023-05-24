import { Injectable } from "@nestjs/common";

@Injectable()
export class CreatePostDto {
  cityOid: string;
  categoryOid: string;
  storeName: string;
  ownerName: string;
  address: string;
  phoneNumber: string;
  contents: string;
  remark: string;
  views: number;

  oid?: string;
  adminOid: string;
}
