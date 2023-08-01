Vue
	.createApp({
		data() {
			return {
				name: "",
				email: "",
				password: "",
				passwordConfirm: "",
				emailError: "",
				passwordError: ""
			};
		},
		methods: {
			async submit() {
				this.emailError = "";
				this.passwordError = "";
				if (!this.email) {
					this.emailError = "Email is required";
				} else if (!this.isValidEmail(this.email)) {
					this.emailError = "Please enter a valid email address";
				}
				if (!this.password) {
					this.passwordError = "Password is required";
				} else if (this.password !== this.passwordConfirm) {
					this.passwordError = "Passwords do not match";
				} else if (!this.isValidPassword(this.password)) {
					this.passwordError = "Passwords do not valid";
				}
				if (!this.emailError && !this.passwordError) {
					const response = await fetch("/api/signup", {
						method: "POST",
						headers: {
							"Content-Type": "application/json"
						},
						body: JSON.stringify({
							name: this.name,
							email: this.email,
							password: this.password
						})
					});
					const data = await response.json();
					console.log(data);
				}
			},
			isValidEmail(email) {
				const emailRegex = /\S+@\S+\.\S+/;
				return emailRegex.test(email);
			},
			isValidPassword(password) {
				// 비밀번호는 8자 이상이어야 합니다.
				if (password.length < 8) {
					return false;
				}
			
				// 비밀번호는 영문자와 숫자를 반드시 포함해야 합니다.
				const hasLetter = /[a-zA-Z]/.test(password);
				const hasNumber = /\d/.test(password);
				if (!hasLetter || !hasNumber) {
					return false;
				}
			
				// 모든 검증을 통과한 경우 유효한 비밀번호입니다.
				return true;
			}
		}
	}).mount("#app")