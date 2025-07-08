Plugin.addRoute({
	name             : 'AlchemyStyleboost#showcase',
	methods          : ['get'],
	can_be_postponed : false,
	paths            : '/alchemy/styleboost/showcase',
	is_system_route  : true,
	permission       : 'alchemy.styleboost.showcase',
});

Plugin.addRoute({
	name             : 'AlchemyStyleboost#chimeraShowcase',
	methods          : ['get'],
	can_be_postponed : false,
	paths            : '/alchemy/styleboost/showcase_chimera',
	is_system_route  : true,
	permission       : 'alchemy.styleboost.showcase',
});

Plugin.addRoute({
	name             : 'AlchemyStyleboost#getCssInfo',
	methods          : ['get'],
	can_be_postponed : false,
	paths            : '/alchemy/styleboost/css_info',
	is_system_route  : true,
});