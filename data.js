var people = [
    {
        First:"Ted",
        Last:"Tandembike",
        age:34,
        job:"pilot"
    },
    {
        First:"Sarah",
        Last:"Smith",
        age:23,
        job:"journalist"
    },
    {
        First:"Peter",
        Last:"Piper",
        age:47,
        job:"writer"
    },
    {
        First:"Isabel",
        Last:"Indigo",
        age:38,
        job:"biologist"
    },
    {
        First:"David",
        Last:"Donovan",
        age:15,
        job:"student"
    }
];

exports.getAll = () => {
    return people;
};

// module.exports = people;