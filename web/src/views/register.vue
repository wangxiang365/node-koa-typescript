<template>
  <div class="register-wrap">
    <div class="content">
    <template v-if="curStep === 0">
      <div class="bg">
        <img src="../assets/images/register-bg.png">
        <div @click="$router.push({path: '/login', query: {invitationCode: $route.query.invitationCode}})" class="back"><van-icon name="arrow-left" />返回登录</div>
      </div>
      <div class="box">
        <ul>
          <li>
            <div class="">
              手机号归属地
            </div>
            <div class="place">
              <span>中国大陆</span>
              <van-icon name="arrow" />
            </div>
          </li>
          <li>
            <div class="ico">
              +86
            </div>
            <div class="inp">
              <input type="tel" placeholder="请输入手机号" maxlength="11" autocomplete="off" v-model="formData.phone" @blur="inputBlur" @focusout="inputBlur">
            </div>
          </li>
          <li>
            <div class="ico">
              * 邀请人手机
            </div>
            <div class="inp">
              <input type="text" placeholder="请输入邀请人手机" v-model="formData.inviter" @input ="checkInviter" maxlength="11" @blur="inputBlur" @focusout="inputBlur">
            </div>
            <div v-if="invitCodeFlag" class="name">{{formData.invitName}}</div>
          </li>
        </ul>
        <div class="submit">
          <van-button type="primary" :disabled="!subActive" @click="subActive?register():''">注册</van-button>
        </div>
        <div class="forget">
          <span>注册即表示同意<i @click="showAgreement = true">注册协议</i></span>
        </div>
      </div>
    </template>
    <!-- 第二步 -->
    <sendCode v-if="curStep===1" :phone="formData.phone" @next="next"></sendCode>
    <!-- 第三步 -->
    <div class="set-pwd" v-if="curStep===2">
      <div class="tit">请为您的账号{{formData.phone}} 设置一个密码</div>
      <ul>
        <li>
          <div>输入密码</div>
          <div class="inp">
            <input type="password" placeholder="请输入新密码" v-model="formData.password">
          </div>
        </li>
        <li>
          <div>确认密码</div>
          <div class="inp">
            <input type="password" placeholder="请确认新密码" v-model="formData.passwordAgain">
          </div>
        </li>
      </ul>
      <van-button type="primary" class="btn" @click="disabled?'': handleSavePassword()">保存密码</van-button>
    </div>
    <!-- 注册协议 -->
      <van-dialog
        v-model="showAgreement"
        title="注册协议"
        width="330px"
        cancelButtonText="不同意协议"
        confirmButtonText="同意协议"
        show-cancel-button
        className="agreement"
        @cancel="$router.replace('login')"
      >
      <div>
        <div>
          在此特别提醒您在注册成为用户之前,请认真阅读本《用户注册协议》(以下简称“协议”),确保您充分理解本协议中各条款。请您审慎阅读并选择接受或不接受本协议。您同意并点击确认本协议条款且完成注册程序后,才能成为的正式注册用户,并享受的各类服务。您的注册、登录、使用等行为将视为对本协议的接受,并同意接受本协议各项条款的约束。若您不同意本协议,或对本协议中的条款存在任何疑问,请您立即停止用户注册程序,并可以选择不使用服务。本协议条款是深圳市亮知物联科技有限公司（以下称“亮知物联”或“我们”）对用户相关政策的许诺,请您务必仔细阅读。
1.用户信息采集
当您在本网站/软件进行用户注册登记，使用本网站/软件的服务，以及参加本网站/软件的活动时，即为您同意本网站/软件将收集您的个人信息，并保存记录。本网站/软件收集的个人信息包括但不限于：姓名、性别、生日、城市、身份证号码、电子邮箱地址、手机电话、血型，收货地址等。您主动提供的信息越多及越准确，我们就能够更好地为您提供有关服务。
2.用户信息的使用
本网站/软件收集个人信息的基本目的是为了更好的了解我们的用户，以便向您提供特色服务和个性化服务。个人信息将主要用于以下几个目的：（1）完成您对特定服务或产品的要求。（2）在我们提供服务时,用于身份验证、客户服务、安全防范、诈骗监测、存档和备份用途,确保我们向您提供的产品和服务的安全性。（3）帮助我们设计新服务,改善我们现有服务。(4)使我们更加了解您如何接入和使用我们的服务,从而针对性地回应您的个性化需求,例如语言设定、位置设定、个性化的帮助服务和指示,或对您和其他用户作出其他方面的回应。(5)用于对本网站/软件用户数据的统计（如用户数量、构成、兴趣、表现等），以便我们向用户提供更好的服务和产品，或向第三方为了一定的合法目的披露该类统计数据。该类统计数据都是用户群整体的信息，而非个人的信息。(6)让您参与有关我们产品和服务的调查。为了让您有更好的体验、改善我们的服务或您同意的其他用途,在符合相关法律法规的前提下,我们可能将通过某一项服务所收集的信息,以汇集信息或者个性化的方式,用于我们的其他服务。例如,在您使用我们的一项服务时所收集的信息,可能在另一服务中用于向您提供特定内容,或向您展示与您相关的、非普遍推送的信息。如果我们在相关服务中提供了相应选项,您也可以授权我们将该服务所提供和储存的信息用于我们的其他服务。
3.用户信息的共享和披露
信息所收集您的个人信息，将仅用于为您提供相关服务。一般情况下，在未得到您的同意之前，您的任何个人信息将不会被提供给无关的第三方。在下列情况下，我们可能会将您的个人信息提供给有关的第三方：(1)本网站/软件的某些服务需由一个合作伙伴(如代理公司、提供相关技术服务的公司、运输公司、邮寄公司、提供奖品的公司等)提供或共同提供。为了向您提供此类服务，本网站有必要与该合作伙伴分享您的个人信息。如果您不希望您的信息被分享，您可以不使用该具体服务从而拒绝您的个人信息被披露。(2)本网站/软件可能会与第三方共同进行推广活动。在推广活动中所收集的全部或部分个人信息可能会与该第三方分享。如果您不想让您的信息被分享，您可以通过不参加该推广活动而拒绝。(3)根据法律法规或政府的强制性规定，我们必须向有关司法或政府部门提供您的个人信息。(4)为了防止他人的合法权益或社会公共利益受到重大危害。(5)为了防止您的合法权益受到重大危害。(6)我们发现您的行为违反了本网站/软件的服务条款或关于特定服务或产品的任何使用指引，或对我们的合法权益构成重大危害。
4.用户管理
您可以在任何时候通过使用您的本网站/软件的注册用户名和密码，查询，补充或更正您的本网站/软件帐户中的个人信息，或要求删除您的本网站/软件帐户中的个人信息。您在本网站/软件的帐户可以被删除，但这样会导致您不能够登录本网站/软件及使用本网站/软件的任何服务。若发现任何非法使用用户帐号或存在安全漏洞的情况,请立即通知本站并向公安机关报案。因用户未妥善保管其帐号名称及密码而导致第三人使用帐号而给用户造成的损失,由用户自行承担。
用户在注册及使用时应承诺遵守法律法规、社会主义制度、国家利益、公民合法权益、
公共秩序、社会道德风尚和信息真实性等七条底线,且用户对其发布的内容(包括但不限于文字、图片等)时,不得有以下情形：
(1)违反宪法或法律法规规定的;
(2)危害国家安全,泄露国家秘密,颠覆国家政权,破坏国家统一的;
(3)损害国家荣誉和利益的,损害公共利益的;
(4)煽动民族仇恨、民族歧视,破坏民族团结的;
(5)破坏国家宗教政策,宣扬邪教和封建迷信的;
(6)散布谣言,扰乱社会秩序,破坏社会稳定的;
(7)散布淫秽、色情、赌博、暴力、凶杀、恐怖或者教唆犯罪的;
(8)侮辱或者诽谤他人,侵害他人合法权益的;
(9)含有法律、行政法规禁止的其他内容或违反的其他规定的。
用户以虚假信息骗取帐号名称注册,或其帐号头像、简介等注册信息存在违法和不良信息的,有权采取通知限期改正、暂停使用、注销登记等措施。帐号仅限于用户本人使用,严禁将您的帐号允许第三人使用,否则用户应承担由此产生的全部责任,并与实际使用人承担连带责任。
5.信息安全
您的本网站/软件帐户信息和本网站/软件档案通过密码来保护，只有您个人才有权获取这些个人信息。我们建议您不要向任何他人泄露您的密码。本网站/软件也不会主动致电或主动发电子邮件给您来询问您的密码，如果您遇到此类情况请及时与客服联系确认。同时，请您在完成工作后，务必退出您的本网站/软件帐户并关闭您的浏览器窗口，以便当您与他人合用一台电脑，或正在公共场所使用电脑时，保证他人无法获取您的个人信息和往来通信。遗憾的是，任何通过互联网或无线网络的数据传输都无法获得绝对的安全保证。所以，在我们尽最大努力来保护您的个人信息的同时，本网站/软件不能对您向我们进行的信息传输，或我们所发的在线产品或服务的信息的安全作出肯定或保证。您作出上述行为时将自己承担风险。一旦我们收到您传输来的信息，我们将尽最大努力保证其在我们系统的安全。
6.用户隐私制度
我们会在您自愿的前提下收集您的个人信息并将这些信息进行整合,包括但不限于注册帐号时的相关信息和活动报名信息等。尊重用户个人隐私是的一项基本政策。所以,不会公开或向任何第三方透露用户的注册资料以及用户因享受服务而提供的任何信息,但以下情形除外:
(1)事先获得用户的明确授权或许可;
(2)遵守有关法律规定,包括在国家有关机关查询时,提供用户的注册信息、用户在本站发布的信息内容及其发布时间、互联网地址或者域名等;
(3)在紧急情况下竭力维护用户个人和社会大众的隐私安全;
(4)根据本条款相关规定或者我们认为必要的其他情形。我们可能会与第三方合作向用户提供相关的网络服务,在此情况下,如该第三方同意承担与我们同等的保护用户隐私的责任,则我们可将用户信息提供给该第三方。
7.所有权及知识产权条款
本“网站/软件”由亮知物联拥有和运作。本“网站/软件”公开或显示的所有内容，包括但不限于文字、图表、照片、图像、动画、音效、插图及软件（简称“内容”）等，均属及其许可人或内容供应商所有。本“网站/软件”内的所有组成要素，包括但不限于整体设计及“内容”，均受商业外观、版权、道德规范、商标及其它所有相关知识产权的法律保护。除非依据本条款与条件或与经在其它协议的声明同意外，本网站/软件內的任何部分或组成要素或“內容”均不得以任何方式复制或传播。除非有明确协议同意，否则网站/软件中的“內容”及一切相关权利将为亮知物联成员或其许可人的资产。
8.责任限制
除非另有明确的书面说明,本站及其所包含的或以其它方式通过本站提供给您的全部信息、内容、材料、产品(包括软件)和服务,均是在"按现状"和"按现有"的基础上提供的。 除非另有明确的书面说明,我们不对本站的运营及其包含在本站上的信息、内容、材料、产品(包括软件)或服务作任何形式的、明示或默示的声明或担保(根据中华人民共和国法律 另有规定的以外)。我们不担保本站所包含的或以其它方式通过本站提供给您的全部信息、内容、材料、产品(包括软件)和服务、其服务器或从本站发出的电子信件、信息没有病毒或其他有害成分。如因不可抗力或其它本站无法控制的原因使本站服务系统溃或无法正常使用导致服务不可用或网上交易无法完成或丢失有关的信息、记录等,我们会合理地尽力协助处理善后事宜。
9.免责声明
客户明确同意使用服务的风险由客户承担。明确表示不提供任何类型的担保，不论是明确的或隐含的。我们将尽力维护客户使用服务的合法权益，但不担保服务一定能满足客户的要求，也不担保服务的及时性、安全性、真实性、稳定性、正确性。对客户使用该等服务中出现的信息（包括但不限于客户发布的信息）删除或储存失败，亦不承担任何责任。
客户理解并接受下载或通过相应产品服务取得的任何信息资料取决于客户自己，并自行承担系统受损、资料丢失以及其他任何风险。我们对客户在互联网上得到的任何商品购物服务、交易进程、招聘信息等，都不作担保。
我们对直接、间接、偶然、特殊及继起的损害不负责任，这些损害来自：不正当使用服务及/或应用服务，在网上购买商品或类似服务，在网上进行交易，非法使用服务或客户传送的信息有所变动。
我们对本项服务下涉及的境内外基础运营商的通信网络的故障、技术缺陷、覆盖范围限制、不可抗力、计算机病毒、黑客攻击、客户所在位置、客户关机或其他非技术能力范围内的事因等造成的服务中断、客户邮件内容丢失、出现乱码、错误接收、无法接收、迟延接收不承担责任。
我们保留判定客户的行为是否符合本服务协议要求的权利，如果客户违背了本服务协议的规定，我们有权中止或终止相应服务。
转户规定：如果客户将手机号码转让给他人，请用户提前自行删除亮知物联内资料。否则，受让该号码的客户将能够查看您的客户个人数据。我们不承担由此引发的客户数据丢失等责任及纠纷。
10.协议更新及用户关注义务
根据国家法律法规的更新及网站运营需要,我们有权对本条款不时地进行修改,修改后的服务条款一旦被张贴在本站上即生效力,并代替原来的服务条款。用户可随时登录查阅最新服务条款内容。如用户不同意更新后的服务条款,应立即停止接受本站提供的服务;如用户继续使用本站提供的服务,即视为同意更新后的用户协议。我们建议您在使用本站之前阅读本用户 协议及本站的公告。如果本用户协议中任何一条被视为废止无效或因任何理由不可执行,该条应视为可分的且并不影响任何其余协议的有效性和可执行性。
11.法律管辖和适用
本用户协议的订立、执行和解释及争议的解决均应适用在中华人民共和国大陆地区现行之有效法律。如发生本服务条款的某些内容与适用之法律相抵触时,则这些条款将完全按法律规定重新解释,而其它有效条款继续有效。如缔约方就本条款內容或其执行发生任何争议,双方应尽力友好协商解决;协商不成时,任何一方均可向所在地的中华人民共和国大陆地区法院提起诉讼。
12.其他
我们尊重用户和消费者的合法权利,本用户协议及本站上发布的各类规则、政策、声明等其他内容,均是为了更好的、更加便利的为用户和消费者提供服务。欢迎用户和社会各界提出意见和建议,我们将虚心接受并适时修改本服务条款及相关政策、规则。
您完成注册且成为的注册用户则意味着您完全接受本用户协议,在注册之前请您再次确认已知悉并完全理解本用户协议的全部内容。
        </div>
      </div>
      </van-dialog>
      <!-- 注册弹窗 -->
      <van-dialog
        v-model="showToast"
        :showConfirmButton="false"
        :showCancelButton="false"
        show-cancel-button
        className="registerConf"
        @cancel="$router.replace('login')"
      >
        <div class="register-confirm-box">
          <div class="confirm-header">
            <h3 class="ta-l">确认您的邀请人信息</h3>
            <span class="fl-r" @click="showToast = false">×</span>
          </div>
          <div class="confirm-body">
            <p>请确认您的邀请人，一旦确认将无法修改</p>
            <div>
              <dl>
                <dt>邀请人ID号</dt>
                <dd>{{formData.beInvitationCode}}</dd>
              </dl>
              <dl>
                <dt>邀请人姓名</dt>
                <dd>{{formData.invitName | filterEmpty}}</dd>
              </dl>
              <dl>
                <dt>邀请人手机</dt>
                <dd>{{formData.invitPhone}}</dd>
              </dl>
            </div>
          </div>
          <div class="confirm-footer">
            <div @click="showToast = false">修改邀请人</div>
            <div @click="getIsRegister">确认</div>
          </div>
        </div>
      </van-dialog>
    </div>
  </div>
</template>

<script>
import { Checkbox, Button, Toast, Icon, Dialog } from 'vant'
import sendCode from '../components/sendCode'
export default {
  components: {
    [Checkbox.name]: Checkbox,
    [Button.name]: Button,
    [Toast.name]: Toast,
    [Icon.name]: Icon,
    [Dialog.Component.name]: Dialog.Component,
    sendCode
  },
  data () {
    return {
      disabled: false,
      formData: {
        phone: '',
        invitName: '',                                        // 手机号
        invitPhone: '',
        inviter: '',                                          // 邀请人
        beInvitationCode: '',
        code: '',                                             // 验证码
        password: '',                                         // 密码
        passwordAgain: ''                                     // 确认密码
      },
      curStep: 0,
      Time: 60,                                                // 倒计时时间
      getCodeNoTap: false,                                     // 获取验证码按钮是否允许点击
      CodeText: '发送验证码',                                   // 验证码文字
      timer: null,                                             // 定时器
      subActive: false,                                        // 提交按钮选中效果
      invitCodeFlag: false,                                    // 确认注册信息弹框
      showToast: false,                                        // 是否注册弹窗
      showAgreement: false                                     // 注册协议
    }
  },
  watch: {
    'formData': {
      handler () {
        this.subActive = (this.formData.phone && this.formData.inviter) ? !!true : !!false
      },
      deep: true
    }
  },
  async mounted () {
    this.formData.inviter = this.$route.query.invitationCode
    if (this.formData.inviter) {
      if (!this.formData.inviter.match(/\D/)) {      // 判断是不是字母开头
        if (this.formData.inviter.length === 11) {
          let result = await this.$http.post(this.api.getInvicationCodeByPhone, {
            phone: this.formData.inviter
          })
          if (result.data.status === this.api.ERR_OK) {
            this.checkInvCode(result.data.data.invitationCode)
          } else {
            this.$toast(result.data.msg)
            this.invitCodeFlag = false
            this.formData.invitName = ''
            this.formData.invitPhone = ''
            this.invitCodeFlag = false
          }
        }
      } else {
        this.checkInvCode(this.formData.inviter)
      }
    }
    // document.body.addEventListener('focusout', () => {
    //   this.inputBlur()
    // })
  },
  methods: {
    /**
     * 验证邀请码
     */
    checkInvCode (code) {
      this.$http.post(`${this.api.checkInvitCode}`, {
        recommendCode: code
      }).then((res) => {
        let resData = res.data
        if (parseInt(resData.status) !== 1) {
          this.invitCodeFlag = false
          // this.$toast(resData.msg)
          return false
        } else {
          this.formData.invitName = resData.data.beCardName
          this.formData.invitPhone = resData.data.bePhone
          this.formData.beInvitationCode = resData.data.beInvitationCode
          this.invitCodeFlag = true
        }
      })
    },
    /**
     * 校验邀请人
    */
    async checkInviter () {
      if (this.formData.inviter && this.formData.phone) {
        this.subActive = true
      } else {
        this.subActive = false
      }
      if (!this.formData.inviter.match(/\D/)) {      // 判断是不是字母开头
        if (this.formData.inviter.length === 11) {
          let result = await this.$http.post(this.api.getInvicationCodeByPhone, {
            phone: this.formData.inviter
          })
          if (result.data.status === this.api.ERR_OK) {
            this.checkInvCode(result.data.data.invitationCode)
          } else {
            this.$toast(result.data.msg)
            this.formData.invitName = ''
            this.formData.invitPhone = ''
            this.invitCodeFlag = false
          }
        } else {
          this.formData.invitName = ''
          this.formData.invitPhone = ''
          this.invitCodeFlag = false
        }
      } else {
        if (this.formData.inviter.length === 5) {       // 输入验证码够5位是请求接口验证
          this.checkInvCode(this.formData.inviter)
        } else {
          this.formData.invitName = ''
          this.formData.invitPhone = ''
          this.invitCodeFlag = false
        }
      }
    },
    /**
     * 校验注册
     */
    registerCheck () {
      return new Promise((resolve, reject) => {
        if (!this.formData.phone) {
          this.$toast('请输入手机号')
          return false
        } else if (!this.formData.phone.match(/^1\d{10}$/)) {
          this.$toast('请输入正确的手机号')
          return false
        } else if (!this.formData.inviter) {
          this.$toast('请输入邀请人ID号')
          return false
        } else if (!this.formData.beInvitationCode.match(/^[A-Z]\d{4,}$/)) {
          this.$toast('邀请码对应用户不存在')
          return false
        }
        resolve(true)
      })
    },
    /**
     * 是否注册
     */
    getIsRegister () {
      this.$http.post(this.api.isRegister, {
        phone: this.formData.phone
      }).then((res) => {
        let resData = res.data
        if (resData.status === this.api.ERR_OK) {
          this.isRegister = false
          this.showToast = false
          this.handleCheckInvitcode()
        } else {
          this.isRegister = true
          this.$toast(resData.msg)
          return false
        }
      })
    },
    /**
     * 注册
    */
    async register () {
      let check = await this.registerCheck()
      if (!this.invitCodeFlag) {
        this.$toast('邀请码对应用户不存在')
        return
      }
      if (check && this.invitCodeFlag) {
        this.showToast = true
      }
    },
    /**
     * 校验邀请码
     */
    handleCheckInvitcode () {
      this.$http.post(this.api.checkInvicationCode, {
        invicationCode: this.formData.beInvitationCode,
        recommendCode: this.formData.beInvitationCode
      }).then((res) => {
        let resData = res.data
        if (resData.status !== this.api.ERR_OK) {
          this.$toast(resData.msg)
          return false
        }
        this.handleSendCode()
      })
    },
    /**
     * 发送验证码
     */
    handleSendCode () {
      if (!this.formData.phone.match(/^1\d{10}$/)) {
        this.$toast('请输入正确的手机号')
        return false
      }
      this.$http.post(this.api.getValidWord, {
        phone: this.formData.phone
      }).then((res) => {
        let resData = res.data
        if (resData.status === this.api.ERR_OK) {
          this.showToast = false
          this.curStep = 1
        }
        this.$toast(res.data.msg)
      })
    },
    /**
     * 下一步
    */
    next (val) {
      this.formData.code = val
      this.curStep = 2
    },
    /**
     * 保存密码
     */
    handleSavePassword () {
      let pwd = this.formData.password
      let pwdAgain = this.formData.passwordAgain
      if (!pwd) {
        this.$toast('请输入密码')
        return false
      } else if (pwd.length < 6 || pwd.length > 20) {
        this.$toast('密码6-20位')
        return false
      }
      if (!pwdAgain) {
        this.$toast('请输入确认密码')
        return false
      } else if (pwdAgain.length < 6 || pwdAgain.length > 20) {
        this.$toast('确认密码6-20位')
        return false
      }
      if (pwd !== pwdAgain) {
        this.$toast('密码输入不一致')
        return false
      }
      this.handleRegister()
    },

    /**
     * 注册
     */
    handleRegister () {
      this.disabled = true
      this.$http.post(`${this.api.register}`, {
        phone: this.formData.phone,
        password: this.formData.password,
        confirmPwd: this.formData.passwordAgain,
        verifyCode: this.formData.code,
        recommendCode: this.formData.beInvitationCode,
        invitationCode: this.formData.beInvitationCode
      }).then((res) => {
        if (res.data.status !== this.api.ERR_OK || !res) {
          this.$toast(res.data.msg)
          this.disabled = false
          return false
        } else {
          this.$toast('注册成功')
          setTimeout(() => {
            this.$router.replace('/login')
          }, 150)
        }
      }).catch(() => {
        this.disabled = false
      })
    },
    /**
     * input 失去焦点
    */
    inputBlur () {
      var u = navigator.userAgent
      var isIOS = !!u.match(/\(i[^;]+;( U;)? CPU.+Mac OS X/)
      if (isIOS) {
        document.body.scrollTop = document.documentElement.scrollTop = 0
        // this.$utils.blurAdjust()
      }
    }
  }
}
</script>
<style lang="less">
.register-wrap{
  max-width: 750px;
  position: absolute;
  top: 0;
  bottom: 0;
  left: 0;
  right: 0;
  margin: auto;
  overflow: hidden;
  z-index: 2000;
  background: #1c1e3a;
  .content{
    position: relative;
    z-index: 3000;
    height: 100%;
    overflow-y: scroll;
  }
  .bg{
    position: relative;
    img{
      width: 100%;
      height: 100%;
    }
    .back{
      position: absolute;
      right: 20px;
      top: 20px;
      color: #8384A0;
      font-size: 26px;
      cursor: pointer;
      display: flex;
      align-items: center;
    }
  }
  .box{
    padding: 0 60px;
  }
  // form
  ul{
    li{
      display: flex;
      height: 127px;
      align-items: center;
      border-bottom: 1px solid rgba(105, 106, 134, 1);
      color: #8384A0;
      font-size: 28px;
      .ico{
        width: 170px;
        margin-right: 30px;
        text-align: left;
        svg{
          width: 35px;
          height: 34px;
          fill: rgba(131, 132, 160, 1);
        }
      }
      .inp{
        flex: 1;
        input{
          width: 100%;
          height: 127px;
          background: none;
          outline: none;
          font-size: 28px;
          color: rgba(131, 132, 160, 1);
        }
      }
      .name{
        max-width: 200px;
        overflow: hidden;
        text-overflow: ellipsis;
        white-space: nowrap;
      }
      .place{
        flex: 1;
        text-align: right;
        span{
          vertical-align: middle;
        }
        i{
          vertical-align: middle;
          margin-left: 15px;
        }
      }
      .getCode{
        width:203px;
        height:65px;
        line-height: 65px;
        border: none;
        background:rgba(105,129,251,1);
        border-radius:10px;
        cursor: pointer;
        &.disabled{
          background: #ccc;
        }
      }
    }
    input::-webkit-input-placeholder {
      color:#8384A0;
    }
  }
  // 改变登录方式
  .change-mode{
    display: flex;
    justify-content: space-between;
    margin-top: 15px;
    cursor: pointer;
    .short-letter{
      font-size: 24px;
      color: rgba(105, 129, 251, 1);
    }
    .remember-pwd{
      display: flex;
      font-size: 24px;
      color: rgba(105, 129, 251, 1);
      .van-checkbox__icon{
        height: 25px;
        line-height: 25px;
      }
      .van-icon{
        width: 25px;
        height: 25px;
        border: 1px solid rgba(105, 129, 251, 1);
      }
      .van-checkbox__label{
        font-size: 24px;
        color: rgba(105, 129, 251, 1);
      }
    }
  }
  // 登录
  .submit{
    .van-button{
      width:622px;
      height:81px;
      line-height: 81px;
      background:rgba(105,129,251,1);
      border-radius:10px;
      font-size: 0.28rem;
      cursor: pointer;
      border: none;
      margin: 0 auto;
      cursor: pointer;
      margin-top: 59px;
    }
    .active{
      opacity: 1;
    }
  }
  // 忘记密码、注册
  .forget{
    display: flex;
    justify-content: space-between;
    margin: 33px 0;
    span{
      font-size: 24px;
      color: rgba(131, 132, 160, 1);
      cursor: pointer;
    }
    i{
      color: #6981FB;
      cursor: pointer;
    }
  }
  .agreement{
    .van-dialog__content{
      padding: 0 30px;
      text-align: left;
      max-height: calc(50vh);
      overflow: auto;
    }
  }
  // 注册弹窗
  .registerConf{
    width: 85%;
    border-radius: 6px;
    .register-confirm-box{
      /*padding: .2rem .3rem;*/
      border-radius: .05rem;

      .confirm-header{
        padding: .2rem .3rem;
        border-bottom: 1px solid #d9d9d9;
        display: flex;
        justify-content: space-between;
        span{
          font-size: .4rem;
          line-height: .44rem;
        }
      }

      .confirm-body{
        font-size: .2rem;
        margin: 0 .3rem;

        p{
          margin: .2rem 0;
          text-align: left;
          color: #f74d4d;
        }

        dl{
          display: flex;
          border: 1px solid #d9d9d9;
          height: .6rem;
          line-height: .6rem;

          dt{
            width: 40%;
            border-right: 1px solid #d9d9d9;
            background: #ebeef5;
          }

          dd{
            width: 60%;
            text-align: center;
          }

        }

        dl:nth-child(2) {
          border-top: 0;
          border-bottom: 0;
        }
      }
      .confirm-footer{
        display: flex;
        margin-top: .2rem;
        border-top: 1px solid #d9d9d9;
        div{
          width: 50%;
          /*color: #f74d4d;*/
          padding: .2rem 0;
          font-size: .24rem;
        }

        div:last-child{
          color: #fff;
          background: #f74d4d;
        }
      }
    }
  }
  // 第三步设置密码
  .set-pwd{
    .tit{
      padding-top: 30px;
      color: #fff;
      font-size: 26px;
    }
    ul {
      width: 700px;
      margin: 34px auto;
      background: rgba(42, 49, 84, 0.6);
      padding: 0 40px;
      box-sizing: border-box;
      li{
        text-align: left;
        height: 95px;
        border-bottom:1px solid rgba(46, 46, 82, 1);
        display: flex;
        align-items: center;
        justify-content: space-between;
        font-size: 28px;
        color: #fff;
        &:last-child{
          border:none;
        }
        .inp{
          flex: 1;
          input{
            width: 100%;
            height: 127px;
            box-sizing: border-box;
            background: none;
            outline: none;
            font-size: 28px;
            color: rgba(131, 132, 160, 1);
            padding-left: 50px;
            text-align: right;
          }
        }
      }
    }
    .btn{
      width: 622px;
      height: 81px;
      line-height: 0.81rem;
      background: #6981fb;
      border-radius: 0.1rem;
      font-size: 0.28rem;
      border: none;
      margin: 0 auto;
      cursor: pointer;
      margin-top: 41px;
    }
  }
}
</style>
