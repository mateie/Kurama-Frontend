module.exports = {
    capFirstLetter: (str) => str.charAt(0).toUpperCase() + str.slice(1),
    optionType(number) {
        switch (number) {
            case 1:
                return "Sub Command";
            case 2:
                return "Sub Command Group";
            case 3:
                return "String";
            case 4:
                return "Integer";
            case 5:
                return "Boolean";
            case 6:
                return "User";
            case 7:
                return "Channel";
            case 8:
                return "Role";
            case 9:
                return "Mentionable";
            case 10:
                return "Number";
            case 11:
                return "Attachment";
            default:
                return "Unknown";
        }
    },
    capEachFirstLetter(str) {
        const temp = [];
        str.split(" ").forEach((str) => {
            temp.push(str.charAt(0).toUpperCase() + str.slice(1));
        });

        return temp.join(" ");
    }
}