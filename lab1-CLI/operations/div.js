module.exports = (first,...args)=>{ 
    debugger;
    return args.reduce(function(agg,val){
        if(val !== 0)
        {
            return agg = agg/val;
        }
        else
        {
            return "can't divide by zero";
        }
    },first); 
};