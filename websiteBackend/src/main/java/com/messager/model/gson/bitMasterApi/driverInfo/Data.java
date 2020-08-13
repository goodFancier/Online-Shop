package com.messager.model.gson.bitMasterApi.driverInfo;

import java.util.List;
import com.google.gson.annotations.Expose;
import com.google.gson.annotations.SerializedName;

public class Data {

    @SerializedName("driver_id")
    @Expose
    private Integer driverId;
    @SerializedName("name")
    @Expose
    private String name;
    @SerializedName("balance")
    @Expose
    private Integer balance;
    @SerializedName("birthday")
    @Expose
    private String birthday;
    @SerializedName("car_id")
    @Expose
    private Integer carId;
    @SerializedName("license")
    @Expose
    private String license;
    @SerializedName("home_phone")
    @Expose
    private String homePhone;
    @SerializedName("mobile_phone")
    @Expose
    private String mobilePhone;
    @SerializedName("is_locked")
    @Expose
    private Boolean isLocked;
    @SerializedName("is_dismissed")
    @Expose
    private Boolean isDismissed;
    @SerializedName("order_params")
    @Expose
    private List<Integer> orderParams = null;
    @SerializedName("phones")
    @Expose
    private List<Phone> phones = null;
    @SerializedName("term_account")
    @Expose
    private String termAccount;
    @SerializedName("name_for_taxophone")
    @Expose
    private String nameForTaxophone;
    @SerializedName("accounts")
    @Expose
    private List<Account> accounts = null;

    public Integer getDriverId() {
        return driverId;
    }

    public void setDriverId(Integer driverId) {
        this.driverId = driverId;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public Integer getBalance() {
        return balance;
    }

    public void setBalance(Integer balance) {
        this.balance = balance;
    }

    public String getBirthday() {
        return birthday;
    }

    public void setBirthday(String birthday) {
        this.birthday = birthday;
    }

    public Integer getCarId() {
        return carId;
    }

    public void setCarId(Integer carId) {
        this.carId = carId;
    }

    public String getLicense() {
        return license;
    }

    public void setLicense(String license) {
        this.license = license;
    }

    public String getHomePhone() {
        return homePhone;
    }

    public void setHomePhone(String homePhone) {
        this.homePhone = homePhone;
    }

    public String getMobilePhone() {
        return mobilePhone;
    }

    public void setMobilePhone(String mobilePhone) {
        this.mobilePhone = mobilePhone;
    }

    public Boolean getIsLocked() {
        return isLocked;
    }

    public void setIsLocked(Boolean isLocked) {
        this.isLocked = isLocked;
    }

    public Boolean getIsDismissed() {
        return isDismissed;
    }

    public void setIsDismissed(Boolean isDismissed) {
        this.isDismissed = isDismissed;
    }

    public List<Integer> getOrderParams() {
        return orderParams;
    }

    public void setOrderParams(List<Integer> orderParams) {
        this.orderParams = orderParams;
    }

    public List<Phone> getPhones() {
        return phones;
    }

    public void setPhones(List<Phone> phones) {
        this.phones = phones;
    }

    public String getTermAccount() {
        return termAccount;
    }

    public void setTermAccount(String termAccount) {
        this.termAccount = termAccount;
    }

    public String getNameForTaxophone() {
        return nameForTaxophone;
    }

    public void setNameForTaxophone(String nameForTaxophone) {
        this.nameForTaxophone = nameForTaxophone;
    }

    public List<Account> getAccounts() {
        return accounts;
    }

    public void setAccounts(List<Account> accounts) {
        this.accounts = accounts;
    }

}
