Plugin.addRoute({
	name             : 'AlchemyStyleboost#showcase',
	methods          : ['get'],
	can_be_postponed : false,
	paths            : '/alchemy/styleboost/showcase',
	is_system_route  : true,
	permission       : 'alchemy.styleboost.showcase',
});