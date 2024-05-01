import {BaileysManager} from "../../../baileys-manager";
import {getWhatsAppId} from "../../../helpers/get-whats-app-Id";
import {checkInstance} from "../../../validate/check-Instance";
import {SendUrlMediaFileDto} from "../../../../../../../application/abstractions/whatsapp-lib/whatsapp-lib.dto";

export class SendUrlMediaFileUseCase {
    constructor(
        private baileysManager: BaileysManager
    ) {
    }

    async execute(input: SendUrlMediaFileDto) {
        const result = await checkInstance(input.id, this.baileysManager)

        const sock = result.waSocket!

        const whatsappId = getWhatsAppId(input.to);
        await result.verifyId(whatsappId);

        await sock.sendMessage(whatsappId,
            // @ts-ignore
            {
                [input.type]: {
                    url: input.url,
                },
                caption: input.caption,
                mimetype: input.mimetype,
            })

    }
}