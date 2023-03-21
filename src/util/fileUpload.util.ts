import sequelize from "sequelize";
import { files } from "src/models";
import { existsSync, readFileSync, renameSync } from "fs";
import { v1 as uuid } from "uuid";

export class Utils {
  // oid 생성
  //   getOid = async (model, param) => {
  //     const data = await model.sequelize.query(
  //       `SELECT Oid_Create("${param}") as Oid`,
  //       {
  //         type: sequelize.QueryTypes.SELECT,
  //       }
  //     );
  //     return data[0].Oid;
  //   };

  // file create를 위한 obj 가공
  async makeFilesObjCreate(
    controlName: string,
    file: any,
    no: number,
    oid: string
  ) {
    if (!file.path) {
      return;
    } else {
      return {
        oid: uuid(),
        postOid: oid,
        controlName: controlName,
        sortNo: no,
        path: file?.path,
        fileName: file?.filename,
        fileExtension: file?.fileExtension,
        size: file?.size,
        originalName: file?.originalname,
        mimetype: file?.mimetype,
      };
    }
  }

  // file create
  async createFiles(
    doc1: any,
    doc2: any,
    elements: any,
    controlName: string,
    oid: any,
    t: any
  ) {
    if (typeof doc1 === "object") {
      const doc1File = await this.makeFilesObjCreate(
        `${controlName}_doc1`,
        doc1,
        0,
        oid
      );

      if (doc1.fileOid) {
        await files.update(doc1File, {
          where: { oid: doc1.fileOid },
          transaction: t,
        });
      } else {
        await files.create(doc1File, { transaction: t });
      }
    }

    if (typeof doc2 === "object") {
      const doc2File = await this.makeFilesObjCreate(
        `${controlName}_doc2`,
        doc2,
        0,
        oid
      );
      if (doc2?.fileOid) {
        await files.update(doc2File, {
          where: { oid: doc2.fileOid },
          transaction: t,
        });
      } else {
        await files.create(doc2File, { transaction: t });
      }
    }

    if (elements) {
      for (const [index, file] of elements) {
        const fileList = await this.makeFilesObjCreate(
          `${controlName}_etc`,
          file,
          index + 1,
          oid
        );

        if (file?.fileOid) {
          await files.update(fileList, {
            where: { oid: file?.fileOid },
            transaction: t,
          });
        } else if (!fileList) {
          return;
        } else {
          await files.create(fileList, {
            transaction: t,
          });
        }
      }
    }
  }

  // update&delete를 한 file만 move
  renameFiles(path: any, fileName: string, movePath: string) {
    if (existsSync(path)) {
      renameSync(path, `${movePath}/${fileName}`);
    }
  }

  makeUserInfo(data: any) {
    const userInfoObj = {
      createId: data.createId,
      updateId: data.updateId,
      createIp: data.createIp,
      updateIp: data.updateIp,
    };

    return userInfoObj;
  }

  makeUpdateUserInfo(data: any) {
    const updateUserInfoObj = {
      updateId: data.updateId,
      updateIp: data.updateIp,
    };

    return updateUserInfoObj;
  }
}
