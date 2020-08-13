
package com.messager.model.gson.bitMasterApi.orderState;

import java.util.List;
import com.google.gson.annotations.Expose;
import com.google.gson.annotations.SerializedName;

public class Data {

    @SerializedName("order_id")
    @Expose
    private Integer orderId;
    @SerializedName("state_id")
    @Expose
    private Integer stateId;
    @SerializedName("state_kind")
    @Expose
    private String stateKind;
    @SerializedName("crew_id")
    @Expose
    private Integer crewId;
    @SerializedName("prior_crew_id")
    @Expose
    private Integer priorCrewId;
    @SerializedName("driver_id")
    @Expose
    private Integer driverId;
    @SerializedName("car_id")
    @Expose
    private Integer carId;
    @SerializedName("server_time_offset")
    @Expose
    private Integer serverTimeOffset;
    @SerializedName("start_time")
    @Expose
    private String startTime;
    @SerializedName("source_time")
    @Expose
    private String sourceTime;
    @SerializedName("finish_time")
    @Expose
    private Object finishTime;
    @SerializedName("source")
    @Expose
    private String source;
    @SerializedName("source_lat")
    @Expose
    private Float sourceLat;
    @SerializedName("source_lon")
    @Expose
    private Float sourceLon;
    @SerializedName("destination")
    @Expose
    private String destination;
    @SerializedName("destination_lat")
    @Expose
    private Float destinationLat;
    @SerializedName("destination_lon")
    @Expose
    private Float destinationLon;
    @SerializedName("stops")
    @Expose
    private List<Object> stops = null;
    @SerializedName("customer")
    @Expose
    private String customer;
    @SerializedName("passenger")
    @Expose
    private String passenger;
    @SerializedName("phone")
    @Expose
    private String phone;
    @SerializedName("client_id")
    @Expose
    private Integer clientId;
    @SerializedName("client_employee_id")
    @Expose
    private Integer clientEmployeeId;
    @SerializedName("order_crew_group_id")
    @Expose
    private Integer orderCrewGroupId;
    @SerializedName("tariff_id")
    @Expose
    private Integer tariffId;
    @SerializedName("order_params")
    @Expose
    private List<Object> orderParams = null;
    @SerializedName("creation_way")
    @Expose
    private String creationWay;
    @SerializedName("is_prior")
    @Expose
    private Boolean isPrior;
    @SerializedName("is_really_prior")
    @Expose
    private Boolean isReallyPrior;
    @SerializedName("email")
    @Expose
    private String email;
    @SerializedName("prior_to_current_before_minutes")
    @Expose
    private Integer priorToCurrentBeforeMinutes;
    @SerializedName("flight_number")
    @Expose
    private String flightNumber;
    @SerializedName("car_mark")
    @Expose
    private String carMark;
    @SerializedName("car_model")
    @Expose
    private String carModel;
    @SerializedName("car_color")
    @Expose
    private String carColor;
    @SerializedName("car_number")
    @Expose
    private String carNumber;
    @SerializedName("confirmed")
    @Expose
    private String confirmed;

    public Integer getOrderId() {
        return orderId;
    }

    public void setOrderId(Integer orderId) {
        this.orderId = orderId;
    }

    public Integer getStateId() {
        return stateId;
    }

    public void setStateId(Integer stateId) {
        this.stateId = stateId;
    }

    public String getStateKind() {
        return stateKind;
    }

    public void setStateKind(String stateKind) {
        this.stateKind = stateKind;
    }

    public Integer getCrewId() {
        return crewId;
    }

    public void setCrewId(Integer crewId) {
        this.crewId = crewId;
    }

    public Integer getPriorCrewId() {
        return priorCrewId;
    }

    public void setPriorCrewId(Integer priorCrewId) {
        this.priorCrewId = priorCrewId;
    }

    public Integer getDriverId() {
        return driverId;
    }

    public void setDriverId(Integer driverId) {
        this.driverId = driverId;
    }

    public Integer getCarId() {
        return carId;
    }

    public void setCarId(Integer carId) {
        this.carId = carId;
    }

    public Integer getServerTimeOffset() {
        return serverTimeOffset;
    }

    public void setServerTimeOffset(Integer serverTimeOffset) {
        this.serverTimeOffset = serverTimeOffset;
    }

    public String getStartTime() {
        return startTime;
    }

    public void setStartTime(String startTime) {
        this.startTime = startTime;
    }

    public String getSourceTime() {
        return sourceTime;
    }

    public void setSourceTime(String sourceTime) {
        this.sourceTime = sourceTime;
    }

    public Object getFinishTime() {
        return finishTime;
    }

    public void setFinishTime(Object finishTime) {
        this.finishTime = finishTime;
    }

    public String getSource() {
        return source;
    }

    public void setSource(String source) {
        this.source = source;
    }

    public Float getSourceLat() {
        return sourceLat;
    }

    public void setSourceLat(Float sourceLat) {
        this.sourceLat = sourceLat;
    }

    public Float getSourceLon() {
        return sourceLon;
    }

    public void setSourceLon(Float sourceLon) {
        this.sourceLon = sourceLon;
    }

    public String getDestination() {
        return destination;
    }

    public void setDestination(String destination) {
        this.destination = destination;
    }

    public Float getDestinationLat() {
        return destinationLat;
    }

    public void setDestinationLat(Float destinationLat) {
        this.destinationLat = destinationLat;
    }

    public Float getDestinationLon() {
        return destinationLon;
    }

    public void setDestinationLon(Float destinationLon) {
        this.destinationLon = destinationLon;
    }

    public List<Object> getStops() {
        return stops;
    }

    public void setStops(List<Object> stops) {
        this.stops = stops;
    }

    public String getCustomer() {
        return customer;
    }

    public void setCustomer(String customer) {
        this.customer = customer;
    }

    public String getPassenger() {
        return passenger;
    }

    public void setPassenger(String passenger) {
        this.passenger = passenger;
    }

    public String getPhone() {
        return phone;
    }

    public void setPhone(String phone) {
        this.phone = phone;
    }

    public Integer getClientId() {
        return clientId;
    }

    public void setClientId(Integer clientId) {
        this.clientId = clientId;
    }

    public Integer getClientEmployeeId() {
        return clientEmployeeId;
    }

    public void setClientEmployeeId(Integer clientEmployeeId) {
        this.clientEmployeeId = clientEmployeeId;
    }

    public Integer getOrderCrewGroupId() {
        return orderCrewGroupId;
    }

    public void setOrderCrewGroupId(Integer orderCrewGroupId) {
        this.orderCrewGroupId = orderCrewGroupId;
    }

    public Integer getTariffId() {
        return tariffId;
    }

    public void setTariffId(Integer tariffId) {
        this.tariffId = tariffId;
    }

    public List<Object> getOrderParams() {
        return orderParams;
    }

    public void setOrderParams(List<Object> orderParams) {
        this.orderParams = orderParams;
    }

    public String getCreationWay() {
        return creationWay;
    }

    public void setCreationWay(String creationWay) {
        this.creationWay = creationWay;
    }

    public Boolean getIsPrior() {
        return isPrior;
    }

    public void setIsPrior(Boolean isPrior) {
        this.isPrior = isPrior;
    }

    public Boolean getIsReallyPrior() {
        return isReallyPrior;
    }

    public void setIsReallyPrior(Boolean isReallyPrior) {
        this.isReallyPrior = isReallyPrior;
    }

    public String getEmail() {
        return email;
    }

    public void setEmail(String email) {
        this.email = email;
    }

    public Integer getPriorToCurrentBeforeMinutes() {
        return priorToCurrentBeforeMinutes;
    }

    public void setPriorToCurrentBeforeMinutes(Integer priorToCurrentBeforeMinutes) {
        this.priorToCurrentBeforeMinutes = priorToCurrentBeforeMinutes;
    }

    public String getFlightNumber() {
        return flightNumber;
    }

    public void setFlightNumber(String flightNumber) {
        this.flightNumber = flightNumber;
    }

    public String getCarMark() {
        return carMark;
    }

    public void setCarMark(String carMark) {
        this.carMark = carMark;
    }

    public String getCarModel() {
        return carModel;
    }

    public void setCarModel(String carModel) {
        this.carModel = carModel;
    }

    public String getCarColor() {
        return carColor;
    }

    public void setCarColor(String carColor) {
        this.carColor = carColor;
    }

    public String getCarNumber() {
        return carNumber;
    }

    public void setCarNumber(String carNumber) {
        this.carNumber = carNumber;
    }

    public String getConfirmed() {
        return confirmed;
    }

    public void setConfirmed(String confirmed) {
        this.confirmed = confirmed;
    }

}
