export default {
    computed: {
        gmBgBox () {
            var styleData = {
                'background-image': 'url(' + this.gameTemplate.gameBigBg + ')'
            }

            return styleData
        },
        gmPlayBox () {
            var styleData = {
                'background-image': 'url(' + this.gameTemplate.gameAnimateGif + ')'
            }

            return styleData
        },
        gmBody () {
            var styleData = {
                'height': '100%',
                'width': '100%',
                'display': 'flex',
                'flex-direction': 'column'
            }

            return styleData
        },
        gmTitle () {
            var styleData = {
                'display': 'block',
                'padding': '0 30px',
                'box-sizing': 'content-box',
                'overflow': 'hidden',
                'height': this.gameTemplate.titleBlockHeight + 'px',
                'font-size': this.gameTemplate.titleFontSize + 'px',
                'text-align': this.gameTemplate.titleAlignment,
                'font-style': this.gameTemplate.titleFontStyle,
                'color': this.gameTemplate.titleFontColor,
                'line-height': this.gameTemplate.titleLineHeight + 'px',
                'padding-top': this.gameTemplate.titleTopHeight + 'px'
            }

            return styleData
        },
        gmContent () {
            var styleData = {
                'flex': '1',
                'display': 'block',
                'padding': '0 30px',
                'box-sizing': 'border-box',
                'overflow': 'auto',
                'font-size': this.gameTemplate.fileFontSize + 'px',
                'color': this.gameTemplate.fileTaxtFontColor,
                'line-height': this.gameTemplate.fileTaxtLineHeight + 'px',
                'padding-top': this.gameTemplate.fileBlcokTopHeight + 'px'
            }

            return styleData
        },
        gmStartBtnOne () {
            var styleData = {
                'display': 'block',
                'height': '42px',
                'text-align': 'center',
                'box-sizing': 'border-box',
                'overflow': 'hidden',
                'font-size': '16px',
                'line-height': '42px',
                'border-radius': '3px',
                'cursor': 'pointer',
                'color': this.gameTemplate.startBtnOneFontColor,
                'background-color': this.gameTemplate.startBtnOneBackColor,
                'border': '1px solid ' + this.gameTemplate.startBtnOneBorderColor,
                'width': '70%',
                'margin-bottom': '20px'
            }

            return styleData
        },
        gmStartBtnTwo () {
            var styleData = {
                'display': 'block',
                'height': '42px',
                'text-align': 'center',
                'box-sizing': 'border-box',
                'overflow': 'hidden',
                'font-size': '18px',
                'line-height': '42px',
                'border-radius': '21px',
                'cursor': 'pointer',
                'color': this.gameTemplate.startBtnTwoFontColor,
                'background-color': this.gameTemplate.startBtnTwoBackColor,
                'border': '1px solid ' + this.gameTemplate.startBtnTwoBorderColor,
                'width': '160px'
            }

            return styleData
        },
        questionTitle () {
            var styleData = {
                'width': '100%',
                'display': 'block',
                'font-size': this.gameTemplate.playQuestionFontSize + 'px',
                'color': this.gameTemplate.playQuestionColor,
                'line-height': this.gameTemplate.playQuestionLineHeight + 'px',
                'margin-top': this.gameTemplate.playQuestionMarginTop + 'px'
            }

            return styleData
        },
        questionImg () {
            var styleData = {
                'overflow': 'hidden',
                'margin-top': this.gameTemplate.playImgMarginTop + 'px'
            }

            return styleData
        },
        questionImgStyle () {
            var styleData = {
                'float': 'left',
                'margin': '0 3px 3px 0',
                'height': this.gameTemplate.playImgHeight + 'px'
            }

            return styleData
        },
        questionAttachmentStyle () {
            var styleData = {
                'margin-top': this.gameTemplate.playAttachmentMarginTop + 'px',
                'height': this.gameTemplate.playAttachmentHeight + 'px'
            }

            return styleData
        },
        attachmentFontStyle () {
            var styleData = {
                'font-size': this.gameTemplate.playAttachmentFontSize + 'px',
                'color': this.gameTemplate.playAttachmentColor,
                'line-height': this.gameTemplate.playAttachmentLineHeight + 'px'
            }

            return styleData
        },
        anwserStyle () {
            var styleData = {
                'margin-top': this.gameTemplate.playAnwserMarginTop + 'px'
            }

            return styleData
        },
        anwserTitle () {
            var styleData = {
                'font-size': this.gameTemplate.playAnwserFontSize + 'px',
                'color': this.gameTemplate.playAnwserColor,
                'line-height': this.gameTemplate.playAnwserLineHeight + 'px'
            }

            return styleData
        },
        selectBtnLineHeight () {
            var styleData = {
                'padding-top': this.gameTemplate.playAnwserLineHeight / 2 - 8 + 'px'
            }

            return styleData
        },
        gmStopBtn () {
            var styleData = {
                'flex': '1',
                'height': '42px',
                'text-align': 'center',
                'box-sizing': 'border-box',
                'overflow': 'hidden',
                'font-size': '16px',
                'line-height': '42px',
                'border-radius': '3px',
                'cursor': 'pointer',
                'margin': '5px 10px',
                'color': this.gameTemplate.stopBtnFontColor,
                'background-color': this.gameTemplate.stopBtnBackColor,
                'border': '1px solid ' + this.gameTemplate.stopBtnBorderColor
            }

            return styleData
        },
        stopPersonBgStyle () {
            var styleData = {
                'background-image': 'url(' + this.gameTemplate.stopPersonBg + ')'
            }

            return styleData
        },
        personStyle () {
            var styleData = {
                'text-align': 'center',
                'font-size': this.gameTemplate.stopPersonFontSize + 'px',
                'color': this.gameTemplate.stopPersonColor,
                'line-height': this.gameTemplate.stopPersonLineHeight + 'px'
            }

            return styleData
        },
        stopFontStyle () {
            var styleData = {
                'position': 'absolute',
                'left': '0',
                'bottom': '15px',
                'width': '100%',
                'text-align': 'center',
                'font-size': this.gameTemplate.stopPersonFontSize + 'px',
                'color': this.gameTemplate.stopPersonColor
            }

            return styleData
        },
        shareBgBox () {
            var styleData = {
                'background-color': '#242180'
            }

            return styleData
        },
        shareNameBg () {
            var styleData = {
                'background-image': 'url(' + this.gameTemplate.shareNameBg + ')',
                'line-height': this.gameTemplate.shareNameLineHeight + 'px'
            }

            return styleData
        },
        shareAttarStyle () {
            var styleData = {
                'width': this.gameTemplate.shareAttarHeight + 'px',
                'height': this.gameTemplate.shareAttarHeight + 'px',
                'margin-top': this.gameTemplate.shareAttarMarginTop + 'px'
            }

            return styleData
        },
        sharePersonBgStyle () {
            var styleData = {
                'background-image': 'url(' + this.gameTemplate.sharePersonBg + ')'
            }

            return styleData
        },
        sharePersonStyle () {
            var styleData = {
                'text-align': 'center',
                'font-size': this.gameTemplate.sharePersonFontSize + 'px',
                'color': this.gameTemplate.sharePersonColor,
                'line-height': this.gameTemplate.sharePersonLineHeight + 'px'
            }

            return styleData
        },
        shareFontStyle () {
            var styleData = {
                'position': 'absolute',
                'left': '0',
                'bottom': '15px',
                'width': '100%',
                'text-align': 'center',
                'font-size': this.gameTemplate.shareThanksFontSize + 'px',
                'color': this.gameTemplate.shareThanksColor
            }

            return styleData
        },
        gmShareBtn () {
            var styleData = {
                'flex': '1',
                'height': '42px',
                'text-align': 'center',
                'box-sizing': 'border-box',
                'overflow': 'hidden',
                'font-size': '16px',
                'line-height': '42px',
                'border-radius': '3px',
                'cursor': 'pointer',
                'margin': '5px 10px',
                'color': this.gameTemplate.shareBtnFontColor,
                'background-color': this.gameTemplate.shareBtnBackColor,
                'border': '1px solid ' + this.gameTemplate.shareBtnBorderColor
            }

            return styleData
        },
        helpPersonBgStyle () {
            var styleData = {
                'background-image': 'url(' + this.gameTemplate.helpPersonBg + ')'
            }

            return styleData
        },
        gmHelpBtn () {
            var styleData = {
                'width': '100%',
                'height': '42px',
                'text-align': 'center',
                'box-sizing': 'border-box',
                'overflow': 'hidden',
                'font-size': '16px',
                'line-height': '42px',
                'border-radius': '3px',
                'cursor': 'pointer',
                'margin': '5px 10px',
                'color': this.gameTemplate.helpBtnFontColor,
                'background-color': this.gameTemplate.helpBtnBackColor,
                'border': '1px solid ' + this.gameTemplate.helpBtnBorderColor
            }

            return styleData
        },
        pkPersonBgStyle () {
            var styleData = {
                'background-image': 'url(' + this.gameTemplate.pkPersonOneBg + ')'
            }

            return styleData
        },
        gmPkBtn () {
            var styleData = {
                'flex': '1',
                'height': '42px',
                'text-align': 'center',
                'box-sizing': 'border-box',
                'overflow': 'hidden',
                'font-size': '16px',
                'line-height': '42px',
                'border-radius': '3px',
                'cursor': 'pointer',
                'margin': '5px 10px',
                'color': this.gameTemplate.pkBtnFontColor,
                'background-color': this.gameTemplate.pkBtnBackColor,
                'border': '1px solid ' + this.gameTemplate.pkBtnBorderColor
            }

            return styleData
        }
    }
}