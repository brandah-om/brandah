import { configureStore } from '@reduxjs/toolkit';
import { hotelsApiSlice } from './hotels/hotelsApiSlice';
import { hotelDetailsApiSlice } from './hotels/hotelDetailsApiSlice';
import { AllTripsSlice } from './trips/AllTripsSlice';
import { TripsDetailsSlice } from './trips/TripsDetailsSlice';
import { RegisterTouristApiSlice } from './register/RegisterTouristApiSlice';
import { AllTourGuideApiSlice } from './tourGuide/AllTourGuideApiSlice';
import { VerifyOtpApiSlice } from './register/VerifyOtpApiSlice';
import { RegisterTourGuideApiSlice } from './register/RegisterTourGuideApiSlice';
import { LoginApiSlice } from './login/LoginApiSlice';
import { AlllanguagesSlice } from './languages/AlllanguagesSlice';
import { AboutPageSlice } from './pages/AboutPageSlice';
import { MicePageSlice } from './pages/MicePageSlice';
import { PrivacyPageSlice } from './pages/PrivacyPageSlice';
import { TermsPageSlice } from './pages/TermsPageSlice';
import { FaqPageSlice } from './pages/FaqPageSlice';
import { HomePageSlice } from './HomePage/HomePageSlice';
import { BlogsPageSlice } from './pages/BlogsPageSlice';
import { BlogsDetailsSlice } from './pages/BlogsDetailsSlice';
import { AllTransportationSlice } from './Transportation/AllTransportationSlice';
import { TransDetailsSlice } from './Transportation/TransDetailsSlice';
import { CarAgencySlice } from './Transportation/CarAgencySlice';
import { DestinationDetailsSlice } from './HomePage/DestinationDetailsSlice';
import { StateDetailsSlice } from './States/StateDetailsSlice';
import { SitesCategorySlice } from './States/SitesCategorySlice';
import { AgencyDetailsSlice } from './Agency/AgencyDetailsSlice';
import { AgencySlice } from './Agency/AgencySlice';
import { HotelsByDestinationSlice } from './hotels/HotelsByDestinationSlice';
import { SitesByStateByCategotySlice } from './States/SitesByStateByCategotySlice';
import { siteDetailApi } from './States/siteDetailApi';
import { GuideByDestinationSlice } from './tourGuide/GuideByDestinationSlice';
import { TourGuideDetailsSlice } from './tourGuide/TourGuideDetailsSlice';
import { CountriesApiSlice } from './Countries/CountriesSlice';
import { GuideLanguageSlice } from './languages/GuideLanguageSlice';
import { CitiesApiSlice } from './Cities/CitiesSlice';
import { GuideBookSlice } from './Booking/GuideBookSlice';

export const store = configureStore({
    reducer: {
        [hotelsApiSlice.reducerPath]: hotelsApiSlice.reducer,
        [hotelDetailsApiSlice.reducerPath]: hotelDetailsApiSlice.reducer,
        [AllTripsSlice.reducerPath]: AllTripsSlice.reducer,
        [TripsDetailsSlice.reducerPath]: TripsDetailsSlice.reducer,
        [RegisterTouristApiSlice.reducerPath]: RegisterTouristApiSlice.reducer,
        [AllTourGuideApiSlice.reducerPath]: AllTourGuideApiSlice.reducer,
        [VerifyOtpApiSlice.reducerPath]: VerifyOtpApiSlice.reducer,
        [RegisterTourGuideApiSlice.reducerPath]: RegisterTourGuideApiSlice.reducer,
        [LoginApiSlice.reducerPath]: LoginApiSlice.reducer,
        [AlllanguagesSlice.reducerPath]: AlllanguagesSlice.reducer,
        [AboutPageSlice.reducerPath]: AboutPageSlice.reducer,
        [MicePageSlice.reducerPath]: MicePageSlice.reducer,
        [PrivacyPageSlice.reducerPath]: PrivacyPageSlice.reducer,
        [TermsPageSlice.reducerPath]: TermsPageSlice.reducer,
        [FaqPageSlice.reducerPath]: FaqPageSlice.reducer,
        [HomePageSlice.reducerPath]: HomePageSlice.reducer,
        [BlogsPageSlice.reducerPath]: BlogsPageSlice.reducer,
        [BlogsDetailsSlice.reducerPath]: BlogsDetailsSlice.reducer,
        [AllTransportationSlice.reducerPath]: AllTransportationSlice.reducer,
        [TransDetailsSlice.reducerPath]: TransDetailsSlice.reducer,
        [CarAgencySlice.reducerPath]: CarAgencySlice.reducer,
        [DestinationDetailsSlice.reducerPath]: DestinationDetailsSlice.reducer,
        [StateDetailsSlice.reducerPath]: StateDetailsSlice.reducer,
        [SitesCategorySlice.reducerPath]: SitesCategorySlice.reducer,
        [AgencyDetailsSlice.reducerPath]: AgencyDetailsSlice.reducer,
        [AgencySlice.reducerPath]: AgencySlice.reducer,
        [HotelsByDestinationSlice.reducerPath]: HotelsByDestinationSlice.reducer,
        [SitesByStateByCategotySlice.reducerPath]: SitesByStateByCategotySlice.reducer,
        [siteDetailApi.reducerPath]: siteDetailApi.reducer,
        [GuideByDestinationSlice.reducerPath]: GuideByDestinationSlice.reducer,
        [TourGuideDetailsSlice.reducerPath]: TourGuideDetailsSlice.reducer,
        [CountriesApiSlice.reducerPath]: CountriesApiSlice.reducer,
        [GuideLanguageSlice.reducerPath]: GuideLanguageSlice.reducer,
        [CitiesApiSlice.reducerPath]: CitiesApiSlice.reducer,
        [GuideBookSlice.reducerPath]: GuideBookSlice.reducer,
    },
    middleware: getDefaultMiddleware =>
        getDefaultMiddleware()
            .concat(hotelsApiSlice.middleware)
            .concat(hotelDetailsApiSlice.middleware)
            .concat(AllTripsSlice.middleware)
            .concat(TripsDetailsSlice.middleware)
            .concat(RegisterTouristApiSlice.middleware)
            .concat(AllTourGuideApiSlice.middleware)
            .concat(VerifyOtpApiSlice.middleware)
            .concat(RegisterTourGuideApiSlice.middleware)
            .concat(LoginApiSlice.middleware)
            .concat(AlllanguagesSlice.middleware)
            .concat(AboutPageSlice.middleware)
            .concat(MicePageSlice.middleware)
            .concat(PrivacyPageSlice.middleware)
            .concat(TermsPageSlice.middleware)
            .concat(FaqPageSlice.middleware)
            .concat(HomePageSlice.middleware)
            .concat(BlogsPageSlice.middleware)
            .concat(BlogsDetailsSlice.middleware)
            .concat(AllTransportationSlice.middleware)
            .concat(TransDetailsSlice.middleware)
            .concat(CarAgencySlice.middleware)
            .concat(StateDetailsSlice.middleware)
            .concat(DestinationDetailsSlice.middleware)
            .concat(SitesCategorySlice.middleware)
            .concat(AgencyDetailsSlice.middleware)
            .concat(AgencySlice.middleware)
            .concat(HotelsByDestinationSlice.middleware)
            .concat(SitesByStateByCategotySlice.middleware)
            .concat(siteDetailApi.middleware)
            .concat(GuideByDestinationSlice.middleware)
            .concat(TourGuideDetailsSlice.middleware)
            .concat(CountriesApiSlice.middleware)
            .concat(GuideLanguageSlice.middleware)
            .concat(CitiesApiSlice.middleware)
            .concat(GuideBookSlice.middleware)
});
