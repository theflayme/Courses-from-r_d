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
    name: "Dmytro",
    birthdayDate: new Date("2003-05-13 12:00:00"),
    numberPhone: "(380) 98-24-72-815",
    address: {
        street: "Chervonoi Kalyny 44",
        city: "Lviv",
        state: "Lvivska",
        zip: "79000",
        country: "Ukraine"
    }
}));
