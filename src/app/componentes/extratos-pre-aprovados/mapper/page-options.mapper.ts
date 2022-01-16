import { Builder } from "builder-pattern";
import { PageOptionsModel } from "../model/page-options.model";

export class PageOptionsMapper {
    public static pageOptionsBuilder(event: any): PageOptionsModel {
        return Builder<PageOptionsModel>()
            .length(event.length)
            .previousPageIndex(event.previousPageIndex)
            .pageSize(event.pageSize)
            .pageIndex((event.pageIndex + 1))
            .build();
    }

    public static newPaginationModel(): PageOptionsModel {
        return PageOptionsMapper.pageOptionsBuilder({
            "previousPageIndex": 0,
            "pageIndex": 0,
            "pageSize": 5,
            "length": 0
        });
    }
}