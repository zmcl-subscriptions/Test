import { HttpException, HttpStatus, Injectable } from "@nestjs/common";
import { CreateMeetingDto } from "./dto/create-meeting.dto";
import WebCreds from "./g-accnt-creds.json";

@Injectable()
export class MeetingService {
  private readonly clientId: string;
  private readonly clientSecret: string;
  private readonly refreshToken: string;

  constructor() {
    this.clientId = WebCreds.web.client_id;
    this.clientSecret = WebCreds.web.client_secret;
    this.refreshToken = WebCreds.web.refreshToken;
  }
  async create(createMeetingDto: CreateMeetingDto) {
    const Meeting = require("google-meet-api").meet;
    // return {
      let lnk = await Meeting({
        clientId: this.clientId,
        clientSecret: this.clientSecret,
        refreshToken: this.refreshToken,
        date: createMeetingDto.meetDate,
        time: createMeetingDto.meetTime,
        summary: createMeetingDto.meetTitle,
        location: "Online",
        description: createMeetingDto.meetDescription,
      // }).then(function (result) {
      //   console.log("final meeting id", result);
      //   return result;
      })
      if (!lnk) {
        throw new HttpException(
          'You are busy at this time slot. Try with some other time slot',
          HttpStatus.BAD_REQUEST,
        );
      }
      return {link: lnk}
      // return lnk;
    // };
  }
}
