<template>
	<view class="content">
		<view class="language">
			<view>
				<u-button type="primary" size="small" :plain=true :class="{inactive: !button1Active}"
					class="lgButton lgButton1" @click="toggleButton(1)" text="中文">
				</u-button>
			</view>
			<view>
				<u-button type="primary" size="small" :plain=true :class="{inactive: !button2Active}"
					class="lgButton" @click="toggleButton(2)" text="English">
				</u-button>
			</view>
		</view>
		<view class="prompt">
			<text class="lined-title"><text class="titleBox">{{header1}}</text></text>
			<u--text type="info" align="center" :text="header2"></u--text>
		</view>
		<view class="text-area">
			<u--form>
		<!-- 		<u-form-item label="姓名" labelWidth="100rpx" borderBottom="true">
					<u--input placeholder="请输入姓名" border="none" v-model="user_info.name"/>
					</u--input>
				</u-form-item>

				<u-form-item label="手机号码" labelWidth="100rpx" borderBottom="true" >
					<u--input placeholder="请输入手机号码" border="none" v-model="user_info.phone"/>
					</u--input>
				</u-form-item> -->
				
				<u-form-item label="姓名" labelWidth="100rpx" borderBottom="true">
					<u--input placeholder="请输入用户名" border="none" v-model="user_info.username"/>
					</u--input>
				</u-form-item>
				
				<u-form-item label="密码" labelWidth="100rpx" borderBottom="true" >
					<u--input placeholder="请输入密码" border="none" v-model="user_info.password"/>
					</u--input>
				</u-form-item>

				<u-form-item label="验证码" labelWidth="100rpx" borderBottom="true">
					
						<u--input placeholder="请输入验证码" border="none" v-model="user_info.code"/>
						<u-toast ref="uToast"></u-toast>
						<u-code :seconds="seconds" @end="end" @start="start" ref="uCode" @change="codeChange"></u-code>
						<u-button @tap="getCode" size="small" type="primary" class="addFlex">{{tips}}</u-button>
					
					</u--input>
				</u-form-item>

			</u--form>
		</view>
		<view class="submit">
			<u-button type="primary" size="small" text="提交" @click="login"></u-button>
		</view>
	</view>
</template>

<script>
	import axios from "axios"
	const API_URL = "/api"
	
	export default {
		data() {
			return {
				title: 'Hello',
				header1: '验证会员身份',
				header2: '请输入会员信息，关联您的专属服务信息',
				button1Active: true,
				button2Active: false,
				languageMode: 'Chinese',
				seconds: 10,
				tips: 'Get Code',
				user_info : {
						name: '',
						phone: '',
						code: '',
						username: '',
						password: ''
				},
				token: '',
				// user: {
				// },
			}
		},
		onLoad() {

		},
		methods: {
			toggleButton: function(buttonNum) {
				if ((buttonNum == 1 && !this.button1Active) || (buttonNum == 2 && !this.button2Active)) {
					//如果按了没被激活的按键
					this.button1Active = this.button1Active ? false : true
					this.button2Active = this.button2Active ? false : true
					this.languageMode = this.button1Active ? 'Chinese': 'English'
					console.log('language mode: ', this.languageMode)
				}

			},
			login() {
				const user_info = this.user_info //用户输入的信息
				// 向后端发送post请求
						axios({
						  method: 'post',
						  url: API_URL + '/login',
						  data: {
						    username: user_info.username,
						    password: user_info.password,
							// code: user_info.code,
							// uuid: '',
						  }
						}).then(response => {
							console.log(response)
							this.token = response.data.token
							console.log("Token:", this.token)
							// console.log(response.data.msg)
						}).catch(error => {
							console.log(error)
						})

			},
			codeChange(text) {
				this.tips = text;
			},
			getCode() {
				if (this.$refs.uCode.canGetCode) {
					// 模拟向后端请求验证码
					uni.showLoading({
						title: '正在获取验证码'
					})
					setTimeout(() => {
						uni.hideLoading();
						// 这里此提示会被this.start()方法中的提示覆盖
						uni.$u.toast('验证码已发送');
						// 通知验证码组件内部开始倒计时
						this.$refs.uCode.start();
					}, 2000);
				} else {
					uni.$u.toast('倒计时结束后再发送');
				}
			},
			end() {
				uni.$u.toast('倒计时结束');
			},
			start() {
				uni.$u.toast('倒计时开始');
			}
		},
		mounted() {
			 // axios
			 //      .get(API_URL)
			 //      .then((response) => {
			 //        this.user = response.data
			 //      })
			 //      .catch((error) => {
			 //        console.log(error)
			 //        console.log(`connection error`)
			 //      })
		}
	}
</script>

<style lang="scss" scoped>
	.content {
		// padding-top: 10%;
		display: block;
		// flex-direction: column;
		// align-items: center;
		// justify-content: center;
	}

	.logo {
		height: 200rpx;
		width: 200rpx;
		margin-top: 200rpx;
		margin-left: auto;
		margin-right: auto;
		margin-bottom: 50rpx;
	}

	.text-area {
		display: flex;
		flex-direction: column;
		justify-content: center;
		align-items: center;
	}
	
	.addFlex {
		flex: 0.5;
	}

	.lined-title {
		font-size: 36rpx;
		color: #3c9cff;
		width: 100%;
		text-align: center;
		border-bottom: 1px solid darkblue;
		line-height: 0.1em;
		margin: 10px 0 20px;
	}

	.titleBox {
		background: #fff;
		padding: 0 10px;
	}

	.language {
		display: flex;
		flex-direction: row;
		justify-content: flex-end;
		padding-top: 2%;
	}

	.lgButton {
		border: none;
		border-radius: 0;
	}
	
	.lgButton1 {
		border-right: solid black;
	}

	.prompt {
		display: flex;
		flex-direction: column;
		justify-content: center;
		align-items: center;
		padding-top: 5%;
	}

	.inactive {
		opacity: 0.4;
	}

	.submit {
		padding-top: 5%;
		margin-left: 20%;
		margin-right: 20%;
	}
</style>
