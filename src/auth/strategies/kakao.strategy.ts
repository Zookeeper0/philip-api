import { PassportStrategy } from "@nestjs/passport";

// export class KakaoStrategy extends PassportStrategy(Strategy) {
//   constructor() {
//     super({
//       clientID: process.env.CLIENT_ID,
//       callbackURL: process.env.REDIRECT_URI,
//     });
//   }

// async validate(accessToken, refreshToken, profile, done) {
//   const profileJson = profile._json;
//   const kakao_account = profileJson.kakao_account;
//   const payload = {
//     name: kakao_account.profile.nickname,
//     kakaoId: profileJson.id,
//     email:
//       kakao_account.has_email && !kakao_account.email_needs_agreement
//         ? kakao_account.email
//         : null,
//   };
//   done(null, payload);
// }
// }
