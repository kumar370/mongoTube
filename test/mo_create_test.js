const Student=require('../app/student'); 
const assert=require('assert');  
describe('Create Tests', () => { 
    it ('create a user in DB', () => { 
        //assert(false);  
        const ashwin=new Student({name: "Ashwin"}); 
        ashwin 
            .save() 
            .then(() => { 
                assert(!ashwin.isNew);
            })  
            .catch(() => { 
                console.log("error");
            })
    });
}); 
// All read tests 
describe("Read Tests",()=> { 
    let reader;  
    beforeEach((done)=> { 
        reader=new Student({name:"Reader"}) 
        reader.save() 
            .then(()=> { 
                done();
            })
    })
    it("Read a user: Reader",(done)=> { 
        Student.find({name: "Reader"}) 
            .then((students)=> { 
                //id is a BSON value 
                assert(reader._id.toString()===students[0]._id.toString()); 
                done();
            });

    });
});  
//All delete tests 
describe("Delete Tests",()=> { 
    let deleter; 
    beforeEach(done=> { 
        deleter=new Student({name: "Deleter"}) 
        deleter.save().then(()=> done());
    }); 
    it("A delete test for deleter",()=> { 
        Student.findByIdAndDelete(deleter._id) 
           .then(()=> Student.findOne({name: "Deleter"}))
           .then((student)=> { 
               assert(student === null); 
               done();
           });
    }); 

}); 
// All update tests 
describe('Update Tests',()=> { 
    let updater;  
    beforeEach(done => { 
        updater=new Student({name:'Updater'}) 
        updater.save() 
            .then(()=>done()) 

    }) 
    it('Set and save test', ()=> { 
        updater.set('name',"UpUpdater");  
        updater.save() 
            .then(()=> Student.find({}))
            .then(students => { 
                assert(students[0].name!=='Updater');  
                done();
            });

    });
});