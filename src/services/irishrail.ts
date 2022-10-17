import { Station, StationData, Train } from '../types';
import http from '../utils/http-common';

const transformStations = (data: any): Station[] => {
    let stations = data;
    if (!Array.isArray(stations)) {
        stations = [data];
    }

    return stations.map((station: any) => ({
        id: station.StationId,
        code: station.StationCode,
        name: station.StationDesc,
        alias: station.StationAlias,
        latitude: station.StationLatitude,
        longitude: station.StationLongitude
    }));
};

const transformStationData = (data: any): StationData => {
    let dataArr = data;
    if (!Array.isArray(data)) {
        dataArr = [data];
    }

    const firstData = dataArr[0] || {};
    const stationData = {
        name: firstData.Stationfullname,
        code: firstData.Stationcode
    };
  
    const trains = dataArr.map((train: any): Train => ({
        code: train.Traincode,
        date: train.Traindate,
        origin: train.Origin,
        destination: train.Destination,
        originTime: train.Origintime,
        destinationTime: train.Destinationtime,
        status: train.Status,
        lastLocation: train.Lastlocation,
        dueIn: train.Duein,
        late: train.Late,
        expectedArrival: train.Exparrival,
        expectedDeparture: train.Expdepart,
        scheduledArrival: train.Scharrival,
        scheduledDeparture: train.Schdepart,
        direction: train.Direction,
        type: train.Traintype,
        locationType: train.Locationtype
    }));
  
    return {
        ...stationData,
        trains
    };
};

// Since this endpoint returns the same array of stations every time, it's better to cache it. 
let cachedDartStations: Station[] = [];

export const getDartStations = async (): Promise<Station[]> => {
    if (cachedDartStations.length > 0) {
        return cachedDartStations;
    }

    cachedDartStations = [];

    const { data } = await http.get('/getAllStationsXML_WithStationType', { params: { StationType: 'D' } });
    if (data && data['ArrayOfObjStation'] && data['ArrayOfObjStation'].objStation) {
       const stations = data['ArrayOfObjStation'].objStation;

       cachedDartStations = transformStations(stations);
    }

    return cachedDartStations;
};

export const getStationDataByName = async (stationName: string): Promise<StationData> => {
    const { data } = await http.get('getStationDataByNameXML', { params: { StationDesc: stationName } });

    if (data && data['ArrayOfObjStationData'] && data['ArrayOfObjStationData'].objStationData) {
       const stationData = data['ArrayOfObjStationData'].objStationData;

       return transformStationData(stationData);
    }

    return {
        code: stationName,
        name: stationName,
        trains: []
    };
};
