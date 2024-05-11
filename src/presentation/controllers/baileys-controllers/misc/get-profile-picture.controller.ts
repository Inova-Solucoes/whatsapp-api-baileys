import {ControllerInterface} from "../../../interfaces/controller.interface";
import {WhatsappService} from "../../../../modules/baileys/facade/baileys.facade.interface";
import {HttpRequest} from "../../../http-types/http-request";
import {HttpResponse} from "../../../http-types/http-response";
import { getProfilePictureValidator } from "../../../validators/baileys/misc/get-profile-picture.validator";

export class GetProfilePictureController implements ControllerInterface {
  constructor(
    private usecase: WhatsappService
  ) {
  }

  async handle(request: HttpRequest): Promise<HttpResponse> {
    const {id} = request.params;
    const {to} = request.body;

    getProfilePictureValidator.validateSync({
      id,to
    })

    const execute= await this.usecase.downloadProfile({
      id, to
    })

    return new HttpResponse(
      {
        message: 'Baileys get profile picture successfully',
        data: execute
      },
      {"Content-Type": "application/json"},
      200
    )

  }
}