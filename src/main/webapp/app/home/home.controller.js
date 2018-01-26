(function () {
    'use strict';

    angular
        .module('cargotrackerApp')
        .controller('HomeController', HomeController);

    HomeController.$inject = ['$scope', 'Principal', 'LoginService', '$state', 'Data', '$window',
        'Port', 'Commodity', 'Dummy'];

    function HomeController($scope, Principal, LoginService, $state, Data, $window,
                            Port, Commodity, Dummy) {
        var vm = this;

        vm.account = null;
        vm.isAuthenticated = null;
        vm.login = LoginService.open;
        vm.register = register;
        vm.Data = Data;
        vm.Commodity = Commodity;
        vm.Port = Port;
        vm.Dummy = Dummy;


        var iso3 = {
            "BD": "BGD",
            "BE": "BEL",
            "BF": "BFA",
            "BG": "BGR",
            "BA": "BIH",
            "BB": "BRB",
            "WF": "WLF",
            "BL": "BLM",
            "BM": "BMU",
            "BN": "BRN",
            "BO": "BOL",
            "BH": "BHR",
            "BI": "BDI",
            "BJ": "BEN",
            "BT": "BTN",
            "JM": "JAM",
            "BV": "BVT",
            "BW": "BWA",
            "WS": "WSM",
            "BQ": "BES",
            "BR": "BRA",
            "BS": "BHS",
            "JE": "JEY",
            "BY": "BLR",
            "BZ": "BLZ",
            "RU": "RUS",
            "RW": "RWA",
            "RS": "SRB",
            "TL": "TLS",
            "RE": "REU",
            "TM": "TKM",
            "TJ": "TJK",
            "RO": "ROU",
            "TK": "TKL",
            "GW": "GNB",
            "GU": "GUM",
            "GT": "GTM",
            "GS": "SGS",
            "GR": "GRC",
            "GQ": "GNQ",
            "GP": "GLP",
            "JP": "JPN",
            "GY": "GUY",
            "GG": "GGY",
            "GF": "GUF",
            "GE": "GEO",
            "GD": "GRD",
            "GB": "GBR",
            "GA": "GAB",
            "SV": "SLV",
            "GN": "GIN",
            "GM": "GMB",
            "GL": "GRL",
            "GI": "GIB",
            "GH": "GHA",
            "OM": "OMN",
            "TN": "TUN",
            "JO": "JOR",
            "HR": "HRV",
            "HT": "HTI",
            "HU": "HUN",
            "HK": "HKG",
            "HN": "HND",
            "HM": "HMD",
            "VE": "VEN",
            "PR": "PRI",
            "PS": "PSE",
            "PW": "PLW",
            "PT": "PRT",
            "SJ": "SJM",
            "PY": "PRY",
            "IQ": "IRQ",
            "PA": "PAN",
            "PF": "PYF",
            "PG": "PNG",
            "PE": "PER",
            "PK": "PAK",
            "PH": "PHL",
            "PN": "PCN",
            "PL": "POL",
            "PM": "SPM",
            "ZM": "ZMB",
            "EH": "ESH",
            "EE": "EST",
            "EG": "EGY",
            "ZA": "ZAF",
            "EC": "ECU",
            "IT": "ITA",
            "VN": "VNM",
            "SB": "SLB",
            "ET": "ETH",
            "SO": "SOM",
            "ZW": "ZWE",
            "SA": "SAU",
            "ES": "ESP",
            "ER": "ERI",
            "ME": "MNE",
            "MD": "MDA",
            "MG": "MDG",
            "MF": "MAF",
            "MA": "MAR",
            "MC": "MCO",
            "UZ": "UZB",
            "MM": "MMR",
            "ML": "MLI",
            "MO": "MAC",
            "MN": "MNG",
            "MH": "MHL",
            "MK": "MKD",
            "MU": "MUS",
            "MT": "MLT",
            "MW": "MWI",
            "MV": "MDV",
            "MQ": "MTQ",
            "MP": "MNP",
            "MS": "MSR",
            "MR": "MRT",
            "IM": "IMN",
            "UG": "UGA",
            "TZ": "TZA",
            "MY": "MYS",
            "MX": "MEX",
            "IL": "ISR",
            "FR": "FRA",
            "IO": "IOT",
            "SH": "SHN",
            "FI": "FIN",
            "FJ": "FJI",
            "FK": "FLK",
            "FM": "FSM",
            "FO": "FRO",
            "NI": "NIC",
            "NL": "NLD",
            "NO": "NOR",
            "NA": "NAM",
            "VU": "VUT",
            "NC": "NCL",
            "NE": "NER",
            "NF": "NFK",
            "NG": "NGA",
            "NZ": "NZL",
            "NP": "NPL",
            "NR": "NRU",
            "NU": "NIU",
            "CK": "COK",
            "XK": "XKX",
            "CI": "CIV",
            "CH": "CHE",
            "CO": "COL",
            "CN": "CHN",
            "CM": "CMR",
            "CL": "CHL",
            "CC": "CCK",
            "CA": "CAN",
            "CG": "COG",
            "CF": "CAF",
            "CD": "COD",
            "CZ": "CZE",
            "CY": "CYP",
            "CX": "CXR",
            "CR": "CRI",
            "CW": "CUW",
            "CV": "CPV",
            "CU": "CUB",
            "SZ": "SWZ",
            "SY": "SYR",
            "SX": "SXM",
            "KG": "KGZ",
            "KE": "KEN",
            "SS": "SSD",
            "SR": "SUR",
            "KI": "KIR",
            "KH": "KHM",
            "KN": "KNA",
            "KM": "COM",
            "ST": "STP",
            "SK": "SVK",
            "KR": "KOR",
            "SI": "SVN",
            "KP": "PRK",
            "KW": "KWT",
            "SN": "SEN",
            "SM": "SMR",
            "SL": "SLE",
            "SC": "SYC",
            "KZ": "KAZ",
            "KY": "CYM",
            "SG": "SGP",
            "SE": "SWE",
            "SD": "SDN",
            "DO": "DOM",
            "DM": "DMA",
            "DJ": "DJI",
            "DK": "DNK",
            "VG": "VGB",
            "DE": "DEU",
            "YE": "YEM",
            "DZ": "DZA",
            "US": "USA",
            "UY": "URY",
            "YT": "MYT",
            "UM": "UMI",
            "LB": "LBN",
            "LC": "LCA",
            "LA": "LAO",
            "TV": "TUV",
            "TW": "TWN",
            "TT": "TTO",
            "TR": "TUR",
            "LK": "LKA",
            "LI": "LIE",
            "LV": "LVA",
            "TO": "TON",
            "LT": "LTU",
            "LU": "LUX",
            "LR": "LBR",
            "LS": "LSO",
            "TH": "THA",
            "TF": "ATF",
            "TG": "TGO",
            "TD": "TCD",
            "TC": "TCA",
            "LY": "LBY",
            "VA": "VAT",
            "VC": "VCT",
            "AE": "ARE",
            "AD": "AND",
            "AG": "ATG",
            "AF": "AFG",
            "AI": "AIA",
            "VI": "VIR",
            "IS": "ISL",
            "IR": "IRN",
            "AM": "ARM",
            "AL": "ALB",
            "AO": "AGO",
            "AQ": "ATA",
            "AS": "ASM",
            "AR": "ARG",
            "AU": "AUS",
            "AT": "AUT",
            "AW": "ABW",
            "IN": "IND",
            "AX": "ALA",
            "AZ": "AZE",
            "IE": "IRL",
            "ID": "IDN",
            "UA": "UKR",
            "QA": "QAT",
            "MZ": "MOZ"
        };


        $scope.$on('authenticationSuccess', function () {
            getAccount();
        });

        getAccount();

        function getAccount() {
            Principal.identity().then(function (account) {
                vm.account = account;
                vm.isAuthenticated = Principal.isAuthenticated;
            });
        }

        function register() {
            $state.go('register');
        }

        Dummy.query().$promise.then(
            function (ret) {
                $scope.commodityData = ret;

            }
        );

        Port.query().$promise.then(
            function (ret) {
                $scope.portData = ret;
            }
        )
        Commodity.query().$promise.then(
            function (ret) {
                $scope.commodity = ret;
            }
        )


        var lineQty = [];
        var lineDates = [];
        var destinationPort = [];
        var pieQty = [];

        $scope.getDiff = function () {


            if ($scope.interval === ("Week")) {
                lineGraph($scope.commodityData, byWeek);
                $scope.lineLayout = {
                    title: 'Week - Wise Quantity'
                };
            }
            else {
                lineGraph($scope.commodityData, byMonth);
                $scope.lineLayout = {
                    title: 'Month - Wise Quantity'
                };
            }
            destination($scope.commodityData, byDestination);

            getLoading();

            var locations = [];
            var z = [];

            for (var i = 0; i < listDestination.length; i++) {
                if (!listDestination[i][0] || !iso3[listDestination[i][0]]) continue;
                locations.push(iso3[listDestination[i][0]]);
                z.push(listDestination[i][1]);
            }

            $scope.choroplethData = [{
                type: 'choropleth',
                locations: locations,
                z: z,
                colorscale: [
                    [0, 'rgb(229, 138, 107)'], [0.2, 'rgb(226, 111, 72)'],
                    [0.4, 'rgb(221, 87, 42)'], [0.6, 'rgb(221, 87, 42)'],
                    [0.8, 'rgb(155, 46, 9)'], [1, 'rgb(58, 17, 2)']
                ],
                colorbar: {
                    title: 'Quantity',
                }
            }];

            $scope.layout = {
                title: 'Destination Port-Wise Quantity',
                geo: {
                    projection: {
                        type: 'robinson'
                    }
                }
            };
        };


        function getLoading() {
            $scope.finalResult = [];

            var Ports = _.groupBy($scope.commodityData, byLoading);
            var loadingPorts = _.pairs(Ports);

            for (var p in loadingPorts) {
                if ($scope.interval === ("Week")) {
                    var x = getDataByTimeframe(loadingPorts[p][1], byWeek);
                }
                else {
                    var x = getDataByTimeframe(loadingPorts[p][1], byMonth);
                }
                var lastValue = x[x.length - 1];
                var prevValue = x[x.length - 2];
                var change = (lastValue[1] - prevValue[1]);

                $scope.finalResult.push({
                    port: loadingPorts[p][0],
                    last: lastValue[1] / 1000000, difference:
                    change / 1000000
                });
            }
        };


        function getDataByTimeframe(data, GroupBy) {

            lineDates = [];
            lineQty = [];
            var groupBy = _.groupBy(data, GroupBy);
            var ret = _.mapObject(groupBy, function (val, key) {
                return _.reduce(val, function (memo, v) {
                    return memo + v.quantity;
                }, 0)
            });

            var list = _.sortBy(_.pairs(ret), function (i) {
                return Number(i[0]);
            });

            return list;
        }


        function lineGraph(data, GroupBy) {

            var list = getDataByTimeframe(data, GroupBy);

            for (var i = 0; i < list.length; i++) {

                lineQty.push(list[i][1]);
                lineDates.push(moment(Number(list[i][0])).format('MM-DD-YYYY'));
            }
            $scope.data = [{
                x: lineDates,
                y: lineQty
            }];
        };

        var listDestination = 0;

        function destination(data, GroupBy) {

            pieQty = [];
            destinationPort = [];

            data = _.filter(data, function (x) {
                return x.destinationPort.countryISO2 && x.destinationPort.countryISO2.length > 0;
            })

            var groupBy = _.groupBy(data, GroupBy);
            var value = _.mapObject(groupBy, function (val, key) {
                return _.reduce(val, function (memo, v) {
                    return memo + v.quantity;
                }, 0)
            });

            listDestination = _.sortBy(_.pairs(value), function (i) {
                return i[1];
            }).reverse();


            var rest = listDestination.slice(4, listDestination.length);

            for (var i = 0; i < 4; i++) {

                pieQty.push(listDestination[i][1]);
                destinationPort.push(listDestination[i][0]);
            }

            var restQty = 0;

            for (var j = 0; j < rest.length; j++) {
                restQty = restQty + rest[j][1];
            }

            pieQty.push(restQty);
            destinationPort.push('Rest of World');

            $scope.pie = [{
                values: pieQty,
                labels: destinationPort,
                type: 'pie'
            }]

            $scope.pieLayout = {
                title: 'Destination Port - Wise Quantity'
            };
        };

        function byWeek(x) {
            return moment({
                hour: 0,
                minute: 0,
                seconds: 0,
                milliseconds: 0
            }).day("Monday").year(moment(x.date).year()).isoWeek(moment(x.date).isoWeek()).valueOf();
        }

        function byMonth(x) {
            return moment({
                hour: 0,
                minute: 0,
                seconds: 0,
                milliseconds: 0
            }).day("Monday").year(moment(x.date).year()).month(moment(x.date).month()).valueOf();
        }

        function byDestination(x) {
            return x.destinationPort.countryISO2;
        }

        function byLoading(x) {
            return x.loadingPort.name
        }

        $scope.fromDate = moment().subtract(1, 'months').toDate();
        $scope.toDate = moment().toDate();
        $scope.downloadUrl = function () {
          return "api/data/?" + "from=" + Date.parse($scope.fromDate) + "&" + "to=" + Date.parse($scope.toDate);
        };

        $scope.trial = function () {

            var from = null;
            var to = null;
            var interval = "Week";
            var portId = null;
            var commodityId = null;

            if ($scope.fromDate) {
                if ($scope.interval == ("Week")) {
                    var startWeek = moment($scope.fromDate, "DD-MMM-YYYY").startOf('week');
                    from = Date.parse(startWeek);
                } else {
                    var startMonth = moment($scope.fromDate, "DD-MMM-YYYY").startOf('month');
                    from = Date.parse(startMonth);
                    interval = "Month";
                }
            }
            if ($scope.toDate) {
                to = Date.parse($scope.toDate);
            }


            if ($scope.selectedCommodity) {
                commodityId = $scope.selectedCommodity.id;
            }

            if ($scope.selectedPort) {
                portId = $scope.selectedPort.id;
            }



                Data.getAll({
                    from: from,
                    to: to,
                    commodityId: commodityId,
                    portId: portId,
                    interval: interval
                }).$promise.then(
                    function (ret) {
                        $scope.allData = ret;
                    }
                )

        }

    }
})();
