const {Schema,model}= require('mongoose');

const puzzleSchema= new Schema({
    description:{
        type:String,
        required:false,
        default:''
    },
    timer:{
        type: Number,
        default:0
    },
    difficulty:{
        type:String
    },
    completed:{
        type:Boolean,
        default:false
    },
    image:{
        type:String
    },
    user: {
        type: Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
});

module.exports=model('Puzzle',puzzleSchema);