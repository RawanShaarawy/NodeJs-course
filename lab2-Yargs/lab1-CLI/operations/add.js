module.exports = (...args)=>{ 
    return args.reduce(function(agg,val){
        return agg += val;
    },0); 
};