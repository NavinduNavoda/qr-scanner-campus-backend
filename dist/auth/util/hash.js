var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
import bcryptjs from "bcryptjs";
export const bhash = (password) => __awaiter(void 0, void 0, void 0, function* () {
    const salt = yield bcryptjs.genSalt();
    return yield bcryptjs.hash(password, salt);
});
export const bcompare = (password, hash) => __awaiter(void 0, void 0, void 0, function* () {
    return yield bcryptjs.compare(password, hash);
});
