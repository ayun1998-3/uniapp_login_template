<template>
	<view class="content">
		<view class="title">
			<text>保障申请提交表</text>
		</view>
		<view class="formContainer">
			<u--form :model="formData">
				<label>保障基本信息</label>
				<u-form-item label="保障名称" labelWidth="100rpx" prop="name">
					<u--input placeholder="请输入保障名称" class="inputArea" v-model="formData.name" />
					</u--input>
				</u-form-item>
				<u-form-item label="保障id" labelWidth="100rpx" prop="id">
					<u--input placeholder="请输入保障id" class="inputArea" v-model="formData.id" />
					</u--input>
				</u-form-item>
				<u-form-item label="团体名称" labelWidth="100rpx" prop="groupName">
					<u--input placeholder="请输入团体名称" class="inputArea" v-model="formData.groupName" />
					</u--input>
				</u-form-item>
				<u-form-item label="团体ID" labelWidth="100rpx" prop="groupId">
					<u--input placeholder="请输入团体id" class="inputArea" v-model="formData.groupId" />
					</u--input>
				</u-form-item>
				<u-form-item label="保障属性" labelWidth="100rpx">
					<!-- 选择器 -->
					<u-picker :show="showp1" :columns="planTypes" @cancel="showp1 = false"
						@confirm="onConfirmPlanType"></u-picker>
					<u-button @click="showp1 = true">{{p1Msg}}</u-button>
					</u--input>
				</u-form-item>
				<u-form-item label="保障责起日期" labelWidth="100rpx">
					<!-- 日期选择器 -->
					<u-datetime-picker :show="showd1" v-model="formData.startDate" mode="date" @cancel="showd1 = false"
						@confirm="onConfirmStartDate"></u-datetime-picker>
					<u-button @click="showd1 = true">{{d1Msg}}</u-button>
				</u-form-item>
				<u-form-item label="保障责止日期" labelWidth="100rpx">
					<u-datetime-picker :show="showd2" v-model="formData.endDate" mode="date" @cancel="showd2 = false"
						@confirm="onConfirmEndDate"></u-datetime-picker>
					<u-button @click="showd2 = true">{{d2Msg}}</u-button>
				</u-form-item>
				<u-form-item label="会员中心显示有效期" labelWidth="100rpx" prop="displayDate">
					<u--input placeholder="请输入会员中心显示有效期" class="inputArea"
						v-model="formData.displayDate" />
					</u--input>
				</u-form-item>
				<u-form-item label="本次上线保障类型" labelWidth="100rpx">
					<!-- 选择器 -->
					<u-picker :show="showp2" :columns="deployMethods" @cancel="showp2 = false"
						@confirm="onConfirmDeployMethod"></u-picker>
					<u-button @click="showp2 = true">{{p2Msg}}</u-button>
				</u-form-item>
				<u-form-item label="是否支持添加家庭成员" labelWidth="100rpx">
					<u-radio-group v-model="formData.addNewFamily" placement="column">
						<u-radio label="是" name="yes"></u-radio>
						<u-radio label="否" name="no"></u-radio>
					</u-radio-group>
				</u-form-item>
				<u-form-item v-if="formData.addNewFamily === 'yes' " label="家庭成员人数" labelWidth="100rpx"
					prop="numFamily">
					<u--input placeholder="请输入家庭成员人数" class="inputArea" v-model="formData.numFamily" />
					</u--input>
				</u-form-item>
				<u-form-item v-if="formData.addNewFamily === 'yes' " label="家庭成员类型" labelWidth="100rpx">
					<u-checkbox-group v-model="formData.members" placement="column">
						<!-- 还需添加‘其他’输入框 -->
						<u-checkbox v-for="name in familyMemberNames" :label="name" :name="name">
						</u-checkbox>
						<u-checkbox label="其他" name="其他"></u-checkbox>
						<u--input placeholder="请输入" v-model="otherFamilyMember"></u--input>
					</u-checkbox-group>
				</u-form-item>
				<u-form-item label="基础类服务添加" labelWidth="100rpx">
					<u-checkbox-group v-model="formData.basicServices" placement="column">
						<!-- 还需添加‘其他’输入框 -->
						<u-checkbox v-for="name in basicServiceNames" :label="name" :name="name">
						</u-checkbox>
						<u-checkbox label="其他" name="其他"></u-checkbox>
						<u--input placeholder="请输入" v-model="otherBasicService"></u--input>
					</u-checkbox-group>
				</u-form-item>
				<u-form-item label="列表类服务添加" labelWidth="100rpx">
					<u-checkbox-group v-model="formData.listServices" placement="column">
						<!-- 还需添加‘其他’输入框 -->
						<u-checkbox v-for="name in listServiceNames" :label="name" :name="name">
						</u-checkbox>
						<u-checkbox label="其他" name="其他"></u-checkbox>
						<u--input placeholder="请输入" v-model="otherListService"></u--input>
					</u-checkbox-group>
				</u-form-item>
				<u-form-item label="保障文件名" labelWidth="100rpx" prop="fileName">
					<u--input placeholder="请输入保障文件名" class="inputArea" v-model="formData.fileName" />
					</u--input>
				</u-form-item>
				<u-form-item label="保障开放入口" labelWidth="100rpx">
					<u-checkbox-group v-model="formData.entryPoint" placement="column">
						<u-checkbox v-for="name in entryPointNames" :label="name" :name="name">
						</u-checkbox>
					</u-checkbox-group>
				</u-form-item>
				<u-form-item label="活动明细" labelWidth="100rpx" prop="eventDetails">
					<u--input placeholder="请输入活动明细" class="inputArea" v-model="formData.eventDetails" />
					</u--input>
				</u-form-item>
				<u-form-item label="变更明细" labelWidth="100rpx" prop="changeDetails">
					<u--input placeholder="请输入变更明细" class="inputArea" v-model="formData.changeDetails" />
					</u--input>
				</u-form-item>
			</u--form>
			<u-button type="success" text="提交申请表" @click="onSubmit" />
		</view>
	</view>

</template>

<script>
	import axios from "axios"
	const API_URL = '/api'
	export default {

		data() {
			return {
				formData: {
					name: '测试1',
					id: 5,
					groupName: '测试1',
					groupId: 1000,
					planType: '个人购买保障计划',
					startDate: Number(new Date()),
					endDate: Number(new Date()),
					displayDate: '2023年8月4日',
					deployMethod: '新保障',
					addNewFamily: 'no',
					numFamily: '',
					members: [],
					basicServices: ['慢病管理'],
					listServices: ['视光眼科'],
					fileName: 'insurance.pdf',
					entryPoint: ['微信公众号'],
					eventDetails: '不明',
					changeDetails: '不明',
				},
				planTypes: [
					['个人购买保障计划', '企业员福保障计划', '保险公司保障计划']
				],
				p1Msg: '请选择保障属性',
				showp1: false,
				d1Msg: '请选择责起日期',
				showd1: false,
				d2Msg: '请选择责止日期',
				showd2: false,
				deployMethods: [
					['新保障', '原保障续保', '原保障+扩充']
				],
				p2Msg: '请选择上线保障类型',
				showp2: false,
				familyMemberNames: ['父亲', '母亲', '配偶父亲', '配偶母亲', '配偶', '子女', '配偶-女'],
				otherFamilyMember: '哈喽',
				basicServiceNames: ['慢病管理', '病程管理', '院内照护', '居家照护', '康护到家',
					'精英专家安排', '就医指导', 'HPV疫苗费用报销'
				],
				otherBasicService: '',
				listServiceNames: ['HPV疫苗预约服务', '视光眼科', '疾病早筛', '伴随诊断', '康复器具', '药械目录'],
				otherListService: '',
				entryPointNames: ['微信公众号', '企业微信', 'URL激活地址'],


			}
		},
		methods: {
			onConfirmPlanType(e) {
				const {
					value
				} = e
				this.showp1 = false
				this.formData.planType = value[0];
				this.p1Msg = "已选： " + this.formData.planType;
			},
			onConfirmDeployMethod(e) {
				const {
					value
				} = e
				this.showp2 = false
				this.formData.deployMethod = value[0];
				this.p2Msg = "已选： " + this.formData.deployMethod;
			},
			onConfirmStartDate(e) {
				const {
					value
				} = e
				let dateValue = new Date(value)
				this.d1Msg = "已选： " + dateValue
				this.showd1 = false;
			},
			onConfirmEndDate(e) {
				const {
					value
				} = e
				let dateValue = new Date(value)
				this.d2Msg = "已选： " + dateValue
				this.showd2 = false;
			},
			// 发送含有表单内容的请求到后端
			onSubmit() {
				console.log(this.formData)
				// 预备请求主体
				const requestBody = {
					name: this.formData.name,
					id: Number(this.formData.id),
					groupName: this.formData.groupName,
					groupId: Number(this.formData.groupId),
					planType: this.formData.planType,
					startDate: new Date(this.formData.startDate).toISOString(),
					endDate: new Date(this.formData.endDate).toISOString(),
					displayDate: this.formData.displayDate,
					deployMethod: this.formData.deployMethod,
					addNewFamily: this.formData.addNewFamily === 'yes' ? true : false,
					numFamily: Number(this.formData.numFamily),
					members: this.formData.members.toString() + (this.formData.members.includes(
						"其他") ? ': ' + this.otherFamilyMember : ''),
					basicServices: this.formData.basicServices.toString() + (this.formData.basicServices.includes(
						"其他") ? ': ' + this.otherBasicService : ''),
					listServices: this.formData.listServices.toString() + (this.formData.listServices.includes(
						"其他") ? ': ' + this.otherListService : ''),
					fileName: this.formData.fileName,
					entryPoint: this.formData.entryPoint.toString(),
					eventDetails: this.formData.eventDetails,
					changeDetails: this.formData.changeDetails
				}
				console.log(requestBody)

				// 向后端发送post请求
				const token = localStorage.getItem("token")
				console.log("token: " + token)
				axios({
					method: 'post',
					url: API_URL + '/insuranceForm/submit',
					headers: {
						'Authorization': 'Bearer ' + token
					},
					data: requestBody
				}).then(response => {
					console.log("已提交!")
					console.log(response)
					// console.log(response.data.msg)
				}).catch(error => {
					console.log(error)
				})
			},

		}
	}
</script>

<style>
	.content {
		display: block;
	}

	.title {
		font-size: 2rem;
	}

	.formContainer {
		display: flex;
		flex-direction: column;
		justify-content: center;
		align-items: center;
	}

	.inputArea {
		margin-left: 1rem;
	}
</style>