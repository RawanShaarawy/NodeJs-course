module.exports = (first,...args)=>{ 
    return args.reduce(function(agg,val){
        return agg *= val;
    },first); 
};