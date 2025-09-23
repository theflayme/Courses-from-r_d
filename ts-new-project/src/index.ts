type UserInfo = {
    name: string;
    birthdayDate: Date;
    numberPhone: number;
    address: {
        street: undefined;
        city: undefined;
        country: undefined;
    };
    children?: null;
};

function getMyInfo(): string {
    const name = "Dmytro";
    const birthdayDate = new Date("2003-05-13 12:00:00");
    const numberPhone = "(380) 98-24-72-815";
    const address = {
        street: "Chervonoi Kalyny 44",
        city: "Lviv",
        state: "Lvivska",
        zip: "79000",
        country: "Ukraine"
    };

    return `Name: ${name}\nBirthday: ${birthdayDate}\nPhone: ${numberPhone}\nAddress: ${JSON.stringify(address)}`;
}

console.log(getMyInfo());
