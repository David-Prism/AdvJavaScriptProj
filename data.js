var people = [
    {
        first:"Bob",
        last:"Burninator",
        age:34,
        job:"pilot"
    },
    {
        first:"Sarah",
        last:"Smith",
        age:23,
        job:"journalist"
    },
    {
        first:"Peter",
        last:"Piper",
        age:47,
        job:"writer"
    },
    {
        first:"Isabel",
        last:"Indigo",
        age:38,
        job:"biologist"
    },
    {
        first:"David",
        last:"Donovan",
        age:15,
        job:"student"
    }
];

exports.getAll = () => {
    return people;
}

exports.getItem = (first) => {
    let found = people.find((person) => {
        return person.first === first;
    });
    if(found !== undefined) {
        return {"item exists":true};
    } else {
        return {"item exists":false};
    }
}

exports.addItem = (newPerson) => {
    let foundIndex = people.findIndex((person) => {
        return person.first === newPerson.first;
    });
    let added;
    if(foundIndex != -1) {
        added = {"added":false};
    } else {
        people.push(newPerson);
        added = {"added":true};
    }
    return added;
}

exports.deleteItem = (first) => {
    let foundIndex = people.findIndex((person) => {
        return person.first === first;
    });
    let removed;
    if(foundIndex != -1) {
        people.splice(foundIndex, 1);
        removed = {"removed":true};
    } else {
        removed = {"removed":false};
    }
    return removed;
}





// module.exports = people;