
export const spaceNumber = (num) => {


    try {
        let str = num.toString();

        let newStr = '';

        while (str.length >= 3) {

            newStr = ' ' + str.substring(str.length - 3, str.length) + newStr;
            str = str.substring(0, str.length - 3)

        }
        // xử lý dư
        if (str.length > 0) {
            newStr = str + newStr;
        }
        return newStr;
    } catch (error) {
        return
    }
}