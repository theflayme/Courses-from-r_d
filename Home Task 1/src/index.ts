type UserInfo = {
    name: string;
    birthdayDate: Date | string;
    numberPhone: number | string;
    address: {
        street: undefined | string;
        city: undefined | string;
        country: undefined | string;
        state?: undefined | string;
        zip?: undefined | string;
    };
    children?: null;
};

function getMyInfo(UserInfo: UserInfo): string {
    const { name, birthdayDate, numberPhone, address } = UserInfo;
    return `Name: ${name}\nBirthday: ${birthdayDate}\nPhone: ${numberPhone}\nAddress: ${JSON.stringify(address)}`;
}

console.log(getMyInfo({
    name: "Kayn",
    birthdayDate: new Date("2000-12-12"),
    numberPhone: "(380) 98-7654-321",
    address: {
        street: "Unknown Street 404",
        city: "Kyiv",
        state: "Kyiv",
        zip: "79000",
        country: "Ukraine"
    }
}));
