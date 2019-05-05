module.exports = (first,...args)=>{ 
    return args.reduce(function(agg,val){
        if(val !== 0)
        {
            return agg %= val;
        }
        else
        {
            return "can not get reminder of a division by zero";
        }
        
    },first); 
};