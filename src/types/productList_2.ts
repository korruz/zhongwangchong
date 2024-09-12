export interface ProductList {
  code?: number;
  msg?: string;
  data?:
    | {
        connectors: {
          connectorId: number;
          bindBatteryVoltage: null;
          boxRealTimeInfoDaoStatus: number;
          connectorStatus: number;
        }[];
        needUserConfirm: boolean;
        boxFeatureDetail: null;
        isOnline: boolean;
        supportSelectBattery: boolean;
        isFault: boolean;
        payScoreAuthorizationState: string;
        boxStatus: string;
        userConfirmExpireTime: number;
        supportWxPayScore: boolean;
        priceStrategy: string;
        totalAmount: null;
        stationName: string;
        onlyForChargePackage: boolean;
        boxCode: string;
        stationId: number;
      }
    | undefined;
}

/*
{
    "code": 0,
    "msg": "success",
    "data": {
        "connectors": [
            {
                "connectorId": 1,
                "bindBatteryVoltage": null,
                "boxRealTimeInfoDaoStatus": 4,
                "connectorStatus": 7
            },
            {
                "connectorId": 2,
                "bindBatteryVoltage": null,
                "boxRealTimeInfoDaoStatus": 4,
                "connectorStatus": 7
            }
        ],
        "needUserConfirm": true,
        "boxFeatureDetail": null,
        "isOnline": true,
        "supportSelectBattery": false,
        "isFault": false,
        "payScoreAuthorizationState": "UNAVAILABLE",
        "boxStatus": "DEPLOYED",
        "userConfirmExpireTime": 30,
        "supportWxPayScore": true,
        "priceStrategy": "[{\"priceStandard\":{\"billingCycle\":60,\"packageTimeCoefficient\":100,\"unitPrice\":15},\"startPower\":0,\"stopPower\":150},{\"priceStandard\":{\"billingCycle\":60,\"packageTimeCoefficient\":170,\"unitPrice\":25},\"startPower\":150,\"stopPower\":280},{\"priceStandard\":{\"billingCycle\":60,\"packageTimeCoefficient\":270,\"unitPrice\":40},\"startPower\":280,\"stopPower\":550},{\"priceStandard\":{\"billingCycle\":60,\"packageTimeCoefficient\":400,\"unitPrice\":60},\"startPower\":550}]",
        "totalAmount": null,
        "stationName": "安徽大学磬苑校区西门",
        "onlyForChargePackage": false,
        "boxCode": "93089447",
        "stationId": 10001307
    }
}
*/
