package com.example.todoappdeel3.models;

public class TopUp {

    private String giftCardCode;
    private double topUpAmount;




    public TopUp() {
    }

    public TopUp(String giftCardCode, double topUpAmount, PlacedOrder placedOrder) {
        this.giftCardCode = giftCardCode;
        this.topUpAmount = topUpAmount;
    }

    public String getGiftCardCode() {
        return giftCardCode;
    }

    public void setGiftCardCode(String giftCardCode) {
        this.giftCardCode = giftCardCode;
    }

    public double getTopUpAmount() {
        return topUpAmount;
    }

    public void setTopUpAmount(double topUpAmount) {
        this.topUpAmount = topUpAmount;
    }


}
