// Single Responsibility: There should never be more than one reason for a class/code unit to change.
// Every class should have single responsibility.
const fs = require('fs');
class Journal{
    constructor(){
        this.entries = {};
    }
    addEntry(text){
        let c = ++Journal.count;
        let entry = `${c}:${text}`;
        this.entries[c] = entry;
        return c;
    }
    removeEntry(index){
        delete this.entries[index];
    }
    toString(){
        return Object.values(this.entries).join('\n');
    }
    // saveFile(filename){
    //     fs.writeFileSync(filename, this.toString());
    // }

}
Journal.count = 0;

class PersistantManager{
    saveToFile(filename,journal){
        fs.writeFileSync(filename,journal.toString());
    }
}

let j = new Journal();
j.addEntry('one');
j.addEntry('two');

let p = new PersistantManager();
p.saveToFile('journal.txt',j);

// here saving file not responsibile Journal. So we created a class which is responsible for such things.
//seperation of concerns
