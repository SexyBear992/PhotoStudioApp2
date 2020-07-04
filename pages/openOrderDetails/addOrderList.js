// 新增订单	addOrderList
export default {
	// 价格
	orderMoney : 500,
	// 精修
	modify:50,
	// 拍摄保底张数
	photoNum:10,
	// 入底
	onBottom:20,
	// 入册
	onCopies:20,
	// 新增产品
	newProduct:[
		{
			// 标题
			title : '10x10杂志册' ,
			// 单价
			price : 1280,
			// P数
			pnum : 8,
			// 数量
			num : 1,
		},
		{
			// 标题
			title : '8寸水晶摆台' ,
			// 单价
			price : 100,
			// P数
			pnum : 1,
			// 数量
			num : 1,
		},
		{
			// 标题
			title : '12寸银色摆台' ,
			// 单价
			price : 200,
			// P数
			pnum : 1,
			// 数量
			num : 1,
		},
		{
			// 标题
			title : '16寸原木相框' ,
			// 单价
			price : 0,
			// P数
			pnum : 1,
			// 数量
			num : 1,
		}
	],
	// 新增服装
	newClothing:[
		{
			title: '汉服女装',
			// 单价 
			price : 800,
			// 类型
			type: '外景',
			// 数量 
			num : 1,	
		},
		{
			title: '汉服男装',
			// 单价 
			price : 800,
			// 类型
			type: '外景',
			// 数量 
			num : 1,	
		},
		{
			title: '现代男装',
			// 单价 
			price : 800,
			// 类型
			type: '内景',
			// 数量 
			num : 1,	
		},
		{
			title: '现代女装',
			// 单价 
			price : 800,
			// 类型
			type: '内景',
			// 数量 
			num : 1,	
		},
		
	],
	// 新增景点
	newAttractions:[
		// 单价	类型
		{
			title: '西湖',
			// 单价 
			price : 100,
			// 类型
			type: '外景',
		},
		{
			title: '湖心岛',
			// 单价 
			price : 800,
			// 类型
			type: '外景',
		},
		{
			title: '1号摄影室',
			// 单价 
			price : 0,
			// 类型
			type: '内景',
		},
	],
	// 新增服务
	newService:[
		{
			title: '婚车服务',
			// 单价 
			price : 5000,
			// 人数
			people: 1,
			// 数量 
			num : 1,	
		},
	]

}